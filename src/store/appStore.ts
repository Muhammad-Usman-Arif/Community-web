import { create } from 'zustand';
import type { User, HelpRequest, Message, Notification } from '../types';
import {
  createHelpRequest as createHelpRequestOp,
  getHelpRequests as getHelpRequestsOp,
  sendMessage as sendMessageOp,
  getMessages as getMessagesOp,
  getConversations as getConversationsOp,
  createNotification as createNotificationOp,
  getNotifications as getNotificationsOp,
  updateUser,
} from '../utils/firebaseOperations';

interface AppState {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  updateCurrentUser: (updates: Partial<User>) => Promise<void>;
  
  helpRequests: HelpRequest[];
  setHelpRequests: (requests: HelpRequest[]) => void;
  addHelpRequest: (request: HelpRequest) => void;
  updateHelpRequest: (id: string, updates: Partial<HelpRequest>) => void;
  createHelpRequest: (request: Omit<HelpRequest, 'id' | 'createdAt'>) => Promise<string>;
  fetchHelpRequests: (filters?: { category?: string; urgency?: string; status?: string; searchTerm?: string }) => Promise<void>;
  
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  sendMessage: (message: Omit<Message, 'id' | 'createdAt'>) => Promise<string>;
  fetchMessages: (userId1: string, userId2: string) => Promise<void>;
  
  notifications: Notification[];
  setNotifications: (notifications: Notification[]) => void;
  addNotification: (notification: Notification) => void;
  markNotificationAsRead: (id: string) => void;
  createNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => Promise<string>;
  fetchNotifications: (userId: string) => Promise<void>;
  
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),
  updateCurrentUser: async (updates) => {
    const { currentUser } = get();
    if (currentUser) {
      await updateUser(currentUser.id, updates);
      set({ currentUser: { ...currentUser, ...updates } });
    }
  },
  
  helpRequests: [],
  setHelpRequests: (requests) => set({ helpRequests: requests }),
  addHelpRequest: (request) => set((state) => ({
    helpRequests: [request, ...state.helpRequests],
  })),
  updateHelpRequest: (id, updates) => set((state) => ({
    helpRequests: state.helpRequests.map((req) =>
      req.id === id ? { ...req, ...updates } : req
    ),
  })),
  createHelpRequest: async (request) => {
    const id = await createHelpRequestOp(request);
    const newRequest: HelpRequest = {
      ...request,
      id,
      createdAt: new Date(),
    };
    get().addHelpRequest(newRequest);
    return id;
  },
  fetchHelpRequests: async (filters) => {
    set({ isLoading: true });
    try {
      const requests = await getHelpRequestsOp(filters);
      set({ helpRequests: requests });
    } finally {
      set({ isLoading: false });
    }
  },
  
  messages: [],
  setMessages: (messages) => set({ messages }),
  addMessage: (message) => set((state) => ({
    messages: [message, ...state.messages],
  })),
  sendMessage: async (message: Omit<Message, 'id' | 'createdAt'>) => {
    console.log('Sending message:', message);
    const id = await sendMessageOp(message);
    const newMessage: Message = {
      ...message,
      id,
      createdAt: new Date(),
    };
    get().addMessage(newMessage);
    return id;
  },
  fetchMessages: async (userId1, userId2) => {
    const messages = await getMessagesOp(userId1, userId2);
    set({ messages });
  },
  
  notifications: [],
  setNotifications: (notifications) => set({ notifications }),
  addNotification: (notification) => set((state) => ({
    notifications: [notification, ...state.notifications],
  })),
  markNotificationAsRead: (id) => set((state) => ({
    notifications: state.notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    ),
  })),
  createNotification: async (notification) => {
    const id = await createNotificationOp(notification);
    const newNotification: Notification = {
      ...notification,
      id,
      createdAt: new Date(),
    };
    get().addNotification(newNotification);
    return id;
  },
  fetchNotifications: async (userId) => {
    const notifications = await getNotificationsOp(userId);
    set({ notifications });
  },
  
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
  
  isDarkMode: false,
  setIsDarkMode: (dark) => set({ isDarkMode: dark }),
}));
