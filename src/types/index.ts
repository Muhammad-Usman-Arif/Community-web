export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'need-help' | 'can-help' | 'both';
  skills: string[];
  interests: string[];
  location: string;
  trustScore: number;
  helpCount: number;
  solvedCount: number;
  badges: Badge[];
  createdAt: Date;
  bio?: string;
  lastActive?: Date;
  isOnline?: boolean;
}

export interface HelpRequest {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  urgency: 'low' | 'medium' | 'high';
  createdBy: string;
  createdAt: Date;
  status: 'open' | 'in-progress' | 'solved' | 'closed';
  helpers: Helper[];
  location?: string;
  aiSummary?: string;
}

export interface Helper {
  userId: string;
  userName: string;
  userAvatar?: string;
  trustScore: number;
  joinedAt: Date;
  accepted?: boolean;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: Date;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  recipientId: string;
  recipientName: string;
  content: string;
  requestId?: string;
  createdAt: Date;
  read: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'new-request' | 'helper-joined' | 'request-solved' | 'message' | 'badge-unlocked';
  title: string;
  description: string;
  relatedId?: string;
  read: boolean;
  createdAt: Date;
}

export interface LeaderboardEntry {
  userId: string;
  userName: string;
  userAvatar?: string;
  trustScore: number;
  helpCount: number;
  solvedCount: number;
  rank: number;
}
