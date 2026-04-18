import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MessageCircle, ThumbsUp, MapPin, Clock } from 'lucide-react';
import { useAppStore } from '../store/appStore';
import { useAuth } from '../hooks/useAuth';
import { getHelpRequest } from '../utils/firebaseOperations';
import type { HelpRequest } from '../types';

const RequestDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { sendMessage } = useAppStore();
  const { user } = useAuth();
  const [request, setRequest] = useState<HelpRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [messageText, setMessageText] = useState('');

  useEffect(() => {
    const fetchRequest = async () => {
      if (!id) return;
      try {
        const req = await getHelpRequest(id);
        setRequest(req);
      } catch (error) {
        console.error('Error fetching request:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchRequest();
  }, [id]);

  const handleSendMessage = async (recipientId: string) => {
    if (!messageText.trim() || !user || !request) return;
    try {
      await sendMessage({
        senderId: user.id,
        senderName: user.name || 'User',
        recipientId,
        recipientName: 'User',
        content: messageText.trim(),
        read: false,
      });
      setMessageText('');
      alert('Message sent!');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'badge-danger';
      case 'medium': return 'badge-warning';
      case 'low': return 'badge-success';
      default: return 'badge-primary';
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading request...</div>;
  }

  if (!request) {
    return <div className="text-center py-8">Request not found</div>;
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-6">
        <div className="card">
          <div className="flex items-start justify-between mb-3">
            <span className={`badge ${getUrgencyBadge(request.urgency)} mb-3`}>
              {request.urgency} priority
            </span>
            <span className={`badge ${request.status === 'open' ? 'badge-success' : request.status === 'in-progress' ? 'badge-warning' : 'badge-primary'}`}>
              {request.status}
            </span>
          </div>
          <h1 className="text-4xl font-bold mb-4">{request.title}</h1>
          <p className="text-neutral-600 mb-6">{request.description}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {request.tags.map((tag) => (
              <span key={tag} className="badge-primary">{tag}</span>
            ))}
          </div>

          <div className="flex items-center gap-4 text-sm text-neutral-500 mb-6">
            <div className="flex items-center gap-1">
              <MapPin size={14} />
              {request.location || 'Remote'}
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} />
              {new Date(request.createdAt).toLocaleDateString()}
            </div>
          </div>

          {request.aiSummary && (
            <div className="border-t border-neutral-200 pt-6">
              <h3 className="font-bold mb-4">AI Summary</h3>
              <p className="text-neutral-700">{request.aiSummary}</p>
            </div>
          )}
        </div>

        {/* Comments/Discussion - Placeholder for now */}
        <div className="card">
          <h2 className="text-2xl font-bold mb-6">Discussion</h2>
          <div className="space-y-4">
            {request.helpers.map((helper) => (
              <div key={helper.userId} className="p-4 border border-neutral-200 rounded-lg">
                <p className="font-medium mb-2">{helper.userName}</p>
                <p className="text-neutral-600">Joined as helper</p>
                <p className="text-xs text-neutral-500 mt-1">
                  {new Date(helper.joinedAt).toLocaleDateString()}
                </p>
              </div>
            ))}
            {request.helpers.length === 0 && (
              <p className="text-neutral-500 text-center">No helpers yet</p>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="card">
          <h3 className="font-bold mb-4">Helpers ({request.helpers.length})</h3>
          <div className="space-y-3">
            {request.helpers.map((helper) => (
              <div key={helper.userId} className="p-3 border border-neutral-200 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  {helper.userAvatar && (
                    <img src={helper.userAvatar} alt={helper.userName} className="w-8 h-8 rounded-full" />
                  )}
                  <div>
                    <p className="font-medium">{helper.userName}</p>
                    <p className="text-xs text-neutral-500">Trust: {helper.trustScore}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate(`/messaging`)}
                    className="btn-secondary text-xs py-1 px-2"
                  >
                    <MessageCircle size={14} className="inline mr-1" />
                    Message
                  </button>
                  {!helper.accepted && (
                    <button className="btn-primary text-xs py-1 px-2">
                      <ThumbsUp size={14} className="inline mr-1" />
                      Accept
                    </button>
                  )}
                </div>
              </div>
            ))}
            {request.helpers.length === 0 && (
              <p className="text-neutral-500 text-center text-sm">No helpers yet</p>
            )}
          </div>
        </div>

        {/* Offer Help */}
        {request.createdBy !== user?.id && (
          <div className="card">
            <h3 className="font-bold mb-4">Offer Your Help</h3>
            <textarea
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Introduce yourself and explain how you can help..."
              className="input-base mb-3"
              rows={4}
            />
            <button
              onClick={() => handleSendMessage(request.createdBy)}
              disabled={!messageText.trim()}
              className="btn-primary w-full disabled:opacity-50"
            >
              Send Offer
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestDetailPage;
