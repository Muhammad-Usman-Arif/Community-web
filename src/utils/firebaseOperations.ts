import { db } from './firebase';
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  setDoc,
  updateDoc,
  query,
  where,
  orderBy,
  QueryConstraint,
} from 'firebase/firestore';
import type { HelpRequest, User, Message, Notification } from '../types';

// Help Requests
export const createHelpRequest = async (request: Omit<HelpRequest, 'id' | 'createdAt'>) => {
  const docRef = await addDoc(collection(db, 'helpRequests'), {
    ...request,
    createdAt: new Date(),
  });
  return docRef.id;
};

export const getHelpRequests = async (filters?: { category?: string; urgency?: string; status?: string; searchTerm?: string }) => {
  const constraints: QueryConstraint[] = [];

  if (filters?.category && filters.category !== 'all') {
    constraints.push(where('category', '==', filters.category));
  }
  if (filters?.urgency && filters.urgency !== 'all') {
    constraints.push(where('urgency', '==', filters.urgency));
  }
  if (filters?.status && filters.status !== 'all') {
    constraints.push(where('status', '==', filters.status));
  }

  constraints.push(orderBy('createdAt', 'desc'));

  const q = query(collection(db, 'helpRequests'), ...constraints);
  const snapshot = await getDocs(q);

  let requests = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as HelpRequest[];

  // Client-side search if searchTerm is provided
  if (filters?.searchTerm) {
    const term = filters.searchTerm.toLowerCase();
    requests = requests.filter(req =>
      req.title.toLowerCase().includes(term) ||
      req.description.toLowerCase().includes(term) ||
      req.tags.some(tag => tag.toLowerCase().includes(term))
    );
  }

  return requests;
};

export const getHelpRequest = async (id: string) => {
  const docRef = doc(db, 'helpRequests', id);
  const snapshot = await getDoc(docRef);
  return { id: snapshot.id, ...snapshot.data() } as HelpRequest;
};

export const updateHelpRequest = async (id: string, updates: Partial<HelpRequest>) => {
  const docRef = doc(db, 'helpRequests', id);
  await updateDoc(docRef, updates);
};

// Users
export const createUser = async (id: string, user: Omit<User, 'id' | 'createdAt'>) => {
  const docRef = doc(db, 'users', id);
  await setDoc(docRef, {
    ...user,
    createdAt: new Date(),
  });
  return id;
};

export const getUser = async (id: string): Promise<User | null> => {
  const docRef = doc(db, 'users', id);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) {
    return null;
  }
  return { id: snapshot.id, ...snapshot.data() } as User;
};

export const updateUser = async (id: string, updates: Partial<User>) => {
  const docRef = doc(db, 'users', id);
  await updateDoc(docRef, updates);
};

// Messages
export const sendMessage = async (message: Omit<Message, 'id' | 'createdAt'>) => {
  const docRef = await addDoc(collection(db, 'messages'), {
    ...message,
    createdAt: new Date(),
  });
  return docRef.id;
};

export const getMessages = async (userId1: string, userId2: string) => {
  const q1 = query(
    collection(db, 'messages'),
    where('senderId', '==', userId1),
    where('recipientId', '==', userId2),
    orderBy('createdAt', 'desc')
  );
  const q2 = query(
    collection(db, 'messages'),
    where('senderId', '==', userId2),
    where('recipientId', '==', userId1),
    orderBy('createdAt', 'desc')
  );

  const [snapshot1, snapshot2] = await Promise.all([getDocs(q1), getDocs(q2)]);
  const messages = [
    ...snapshot1.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
    ...snapshot2.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
  ] as Message[];

  // Sort by createdAt descending
  return messages.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};

// Get all conversations for a user
export const getConversations = async (userId: string) => {
  const q1 = query(
    collection(db, 'messages'),
    where('senderId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  const q2 = query(
    collection(db, 'messages'),
    where('recipientId', '==', userId),
    orderBy('createdAt', 'desc')
  );

  const [snapshot1, snapshot2] = await Promise.all([getDocs(q1), getDocs(q2)]);
  const messages = [
    ...snapshot1.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
    ...snapshot2.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
  ] as Message[];

  // Group by conversation partner
  const conversations = new Map<string, Message>();
  messages.forEach((msg) => {
    const partnerId = msg.senderId === userId ? msg.recipientId : msg.senderId;
    if (!conversations.has(partnerId) || msg.createdAt > conversations.get(partnerId)!.createdAt) {
      conversations.set(partnerId, msg);
    }
  });

  return Array.from(conversations.values()).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};
export const createNotification = async (notification: Omit<Notification, 'id' | 'createdAt'>) => {
  const docRef = await addDoc(collection(db, 'notifications'), {
    ...notification,
    createdAt: new Date(),
  });
  return docRef.id;
};

export const getNotifications = async (userId: string) => {
  const q = query(
    collection(db, 'notifications'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Notification[];
};

export const markNotificationAsRead = async (id: string) => {
  const docRef = doc(db, 'notifications', id);
  await updateDoc(docRef, { read: true });
};
