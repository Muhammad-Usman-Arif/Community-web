import { useEffect, useState } from 'react';
import type { User as FirebaseUser } from 'firebase/auth';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { getUser, createUser, updateUser } from '../utils/firebaseOperations';
import type { User } from '../types';

export function useAuth() {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setFirebaseUser(firebaseUser);

      if (firebaseUser) {
        try {
          // Try to get existing user profile
          let userProfile = await getUser(firebaseUser.uid);

          if (!userProfile) {
            userProfile = {
              id: firebaseUser.uid,
              name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Community Member',
              email: firebaseUser.email || '',
              avatar: firebaseUser.photoURL || '',
              role: 'both',
              skills: [],
              interests: [],
              location: '',
              trustScore: 0,
              helpCount: 0,
              solvedCount: 0,
              badges: [],
              bio: '',
              createdAt: new Date(),
              lastActive: new Date(),
              isOnline: true,
            };
            await createUser(firebaseUser.uid, {
              name: userProfile.name,
              email: userProfile.email,
              avatar: userProfile.avatar,
              role: userProfile.role,
              skills: userProfile.skills,
              interests: userProfile.interests,
              location: userProfile.location,
              trustScore: userProfile.trustScore,
              helpCount: userProfile.helpCount,
              solvedCount: userProfile.solvedCount,
              badges: userProfile.badges,
              bio: userProfile.bio,
              lastActive: userProfile.lastActive,
              isOnline: userProfile.isOnline,
            });
          } else {
            // Update last active and online status
            await updateUser(firebaseUser.uid, {
              lastActive: new Date(),
              isOnline: true,
            });
          }

          setUser(userProfile);
        } catch (err) {
          console.error('Error fetching/creating user profile:', err);
          setError('Failed to load user profile');
        }
      } else {
        setUser(null);
      }

      setLoading(false);
    }, (err) => {
      setError(err.message);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setError(null);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const signUp = async (email: string, password: string, displayName: string) => {
    try {
      setError(null);
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName });
      return result.user;
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const logout = async () => {
    try {
      if (user) {
        await updateUser(user.id, { isOnline: false });
      }
      await signOut(auth);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  return { user, firebaseUser, loading, error, signIn, signUp, logout };
}

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export function useFetch<T>(
  fetchFn: () => Promise<T>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetch = async () => {
      try {
        setLoading(true);
        const result = await fetchFn();
        if (isMounted) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'An error occurred');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetch();

    return () => {
      isMounted = false;
    };
  }, dependencies);

  return { data, loading, error };
}
