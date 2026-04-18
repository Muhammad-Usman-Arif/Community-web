import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Send, Search, User, MessageCircle, Phone, Video, Menu, X } from 'lucide-react';
import { useAppStore } from '../store/appStore';
import { useAuth } from '../hooks/useAuth';

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  preview: string;
  time: string;
  unread: number;
  online: boolean;
}

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  time: string;
  isOwn: boolean;
}

const MessagingPage: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { currentUser, messages, fetchMessages, sendMessage } = useAppStore();
  const { user } = useAuth();

  // Mock conversations for demo (replace with real store data)
  const conversations: Conversation[] = [
    {
      id: 'conv1',
      name: 'Alice Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=48&h=48&fit=crop&crop=face',
      preview: 'Thanks for the React help! Can you...',
      time: '2:30 PM',
      unread: 3,
      online: true,
    },
    {
      id: 'conv2',
      name: 'Bob Smith',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=48&h=48&fit=crop&crop=face',
      preview: 'Code review done. Here are the suggestions...',
      time: '1:45 PM',
      unread: 0,
      online: false,
    },
    {
      id: 'conv3',
      name: 'Carol Davis',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=48&h=48&fit=crop&crop=face',
      preview: 'Request solved! 🎉 Thanks a lot!',
      time: '10:20 AM',
      unread: 1,
      online: true,
    },
  ];

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = async () => {
    if (messageText.trim() && selectedConversation && currentUser) {
      const newMsg = {
        senderId: currentUser.id,
        senderName: currentUser.name,
        recipientId: selectedConversation,
        recipientName: 'User',
        content: messageText.trim(),
        read: false
      };
      try {
        await sendMessage(newMsg as any);
        setMessageText('');
      } catch (error) {
        console.error('Failed to send message:', error);
        alert('Message failed to send. Please try again.');
      }
    }
  };

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom]);

  return (
    <div className="flex h-screen bg-neutral-900">
      {/* Mobile Menu Toggle */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-neutral-800 rounded-xl backdrop-blur-lg"
        onClick={() => setShowMobileMenu(true)}
      >
        <Menu size={20} />
      </button>

      {/* Conversations Sidebar */}
      <div className={`lg:w-80 bg-neutral-900 border-r border-neutral-800 flex flex-col transition-transform ${
        showMobileMenu ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } lg:relative fixed inset-y-0 left-0 z-40`}>
        {/* Overlay for mobile */}
        {showMobileMenu && (
          <div 
            className="fixed inset-0 bg-black/50 lg:hidden z-30"
            onClick={() => setShowMobileMenu(false)}
          />
        )}

        {/* Header */}
        <div className="p-6 border-b border-neutral-800 sticky top-0 bg-neutral-900/95 backdrop-blur-lg z-10">
          <div className="flex items-center gap-3 mb-4">
            <MessageCircle size={28} className="text-primary-400" />
            <div>
              <h2 className="font-bold text-xl text-white">Messages</h2>
              <p className="text-sm text-neutral-400">Your conversations</p>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={20} />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-base pl-12 pr-4 w-full"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto py-4">
          {filteredConversations.map((conv) => (
            <div
              key={conv.id}
              className={`p-4 cursor-pointer hover:bg-neutral-800 transition-colors group border-b border-neutral-850 ${
                selectedConversation === conv.id ? 'bg-primary-500/10 border-primary-500 border-l-4 border-l-primary-400' : ''
              }`}
              onClick={() => {
                setSelectedConversation(conv.id);
                setShowMobileMenu(false);
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-12 h-12 rounded-full overflow-hidden flex items-center justify-center font-semibold text-sm ${
                  conv.online ? 'bg-green-500 ring-2 ring-green-400/50' : 'bg-neutral-700'
                }`}>
                  {conv.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white truncate">{conv.name}</p>
                  <p className="text-sm text-neutral-400 truncate">{conv.preview}</p>
                </div>
                <div className="flex flex-col items-end gap-1 text-xs text-neutral-500">
                  <span>{conv.time}</span>
                  {conv.unread > 0 && (
                    <span className="w-5 h-5 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-xs">
                      {conv.unread > 99 ? '99+' : conv.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        {selectedConversation ? (
          <div className="p-6 border-b border-neutral-800 bg-neutral-900/95 backdrop-blur-lg sticky top-0 z-10">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center shadow-xl">
                A
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-xl text-white">Alice Johnson</h3>
                <p className="text-sm text-neutral-400">Active 2 mins ago</p>
              </div>
              <div className="flex gap-2">
                <button className="p-3 hover:bg-neutral-800 rounded-xl transition-colors">
                  <Phone size={20} />
                </button>
                <button className="p-3 hover:bg-neutral-800 rounded-xl transition-colors">
                  <Video size={20} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center p-12 border-b border-neutral-800">
            <div className="text-center max-w-md">
              <MessageCircle size={72} className="mx-auto text-neutral-600 mb-6" />
              <h3 className="text-2xl font-bold text-neutral-300 mb-3">Welcome to Messages</h3>
              <p className="text-neutral-500 mb-8">Select a conversation to start chatting or accept help offers from your requests.</p>
              <div className="flex gap-4 justify-center">
                <button className="btn-primary px-8 py-3">New Message</button>
              </div>
            </div>
          </div>
        )}

        {/* Messages Container */}
        {selectedConversation && (
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-neutral-900 via-neutral-900/50 to-neutral-950">
            {/* Mock Messages */}
            <div className="flex justify-start">
              <div className="max-w-md p-4 bg-neutral-800 rounded-2xl rounded-br-sm">
                <p className="text-white">Thanks for helping with my React issue! The useEffect fix worked perfectly.</p>
                <p className="text-xs text-neutral-400 mt-2">2:30 PM</p>
              </div>
            </div>

            <div className="flex justify-end">
              <div className="max-w-md p-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-2xl rounded-bl-sm">
                <p>Great! Let me know if you need help with anything else.</p>
                <p className="text-primary-100 text-xs mt-2">2:32 PM</p>
              </div>
            </div>

            <div className="flex justify-start">
              <div className="max-w-md p-4 bg-neutral-800 rounded-2xl rounded-br-sm">
                <p>One more question - how do I optimize the state updates?</p>
                <p className="text-xs text-neutral-400 mt-2">2:35 PM</p>
              </div>
            </div>

            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Message Input */}
        {selectedConversation && (
          <div className="p-6 border-t border-neutral-800 bg-neutral-900/95 backdrop-blur-lg">
            <div className="flex items-end gap-3">
              <div className="flex-1 relative">
                <textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
                  placeholder="Type your message..."
                  className="input-base pr-12 py-4 bg-neutral-800/50 focus:bg-neutral-800/80 resize-none h-16 text-lg"
                  rows={1}
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!messageText.trim()}
                className="btn-primary p-4 rounded-2xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-xl h-16 w-16 flex items-center justify-center"
              >
                <Send size={20} className="rotate-45 group-hover:rotate-0 transition-transform" />
              </button>
            </div>
            <p className="text-xs text-neutral-500 text-center mt-2">
              Shift + Enter for new line
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagingPage;

