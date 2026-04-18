import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import { useEffect, Suspense } from 'react';
import { useAppStore } from './store/appStore';
import './App.css';

// Pages - All real pages now
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import OnboardingPage from './pages/OnboardingPage';
import DashboardPage from './pages/DashboardPage';
import ExplorePage from './pages/ExplorePage';
import CreateRequestPage from './pages/CreateRequestPage';
import RequestDetailPage from './pages/RequestDetailPage';
import MessagingPage from './pages/MessagingPage';
import LeaderboardPage from './pages/LeaderboardPage';
import NotificationsPage from './pages/NotificationsPage';
import ProfilePage from './pages/ProfilePage';
import AdminPanel from './pages/AdminPanel';
const AICenterPage = () => <div className="min-h-screen p-8">
  <div className="card max-w-4xl mx-auto">
    <h1 className="text-4xl font-bold mb-8">AI Center 🚀</h1>
    <p className="text-xl text-neutral-600 mb-8">Advanced AI features coming soon!</p>
    <div className="grid md:grid-cols-2 gap-8">
      <div className="card p-8 text-center">
        <div className="text-5xl mb-4">🤖</div>
        <h3 className="text-2xl font-bold mb-4">AI Request Summaries</h3>
        <p>Smart summaries of help requests</p>
      </div>
      <div className="card p-8 text-center">
        <div className="text-5xl mb-4">💡</div>
        <h3 className="text-2xl font-bold mb-4">Smart Matching</h3>
        <p>AI-powered helper recommendations</p>
      </div>
    </div>
  </div>
</div>;

// Layout
import MainLayout from './components/layouts/MainLayout';

function App() {
  const { user, loading } = useAuth();
  const { setCurrentUser, fetchHelpRequests, fetchNotifications } = useAppStore();

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
      fetchHelpRequests();
      if (user.id) fetchNotifications(user.id);
    } else {
      setCurrentUser(null);
    }
  }, [user, setCurrentUser, fetchHelpRequests, fetchNotifications]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-8"></div>
          <div className="space-y-2">
            <p className="text-2xl font-bold text-neutral-800">Loading Helpytics</p>
            <p className="text-neutral-600">Connecting to community...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <Suspense fallback={
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50 flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      }>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={user ? <Navigate to="/dashboard" /> : <AuthPage />} />
          <Route path="/onboarding" element={user ? <OnboardingPage /> : <Navigate to="/auth" />} />

          {user ? (
            <Route element={<MainLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/create-request" element={<CreateRequestPage />} />
              <Route path="/request/:id" element={<RequestDetailPage />} />
              <Route path="/messaging" element={<MessagingPage />} />
              <Route path="/leaderboard" element={<LeaderboardPage />} />
              <Route path="/ai-center" element={<AICenterPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/profile/:id" element={<ProfilePage />} />
              <Route path="/admin" element={<AdminPanel />} />
            </Route>
          ) : null}

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;

