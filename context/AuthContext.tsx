import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define User Profile Type
export interface UserProfileType {
  id: string;
  name: string | null;
  email: string;
  photo: string | null;
  familyName: string | null;
  givenName: string | null;
}

// Define Context Types
interface AuthContextType {
  user: UserProfileType | null;
  login: (profile: UserProfileType) => Promise<void>;
  logout: () => Promise<void>;
  setProfile: (profile: UserProfileType) => Promise<void>;
  loading: boolean;
}

// Default context value
const defaultAuthContext: AuthContextType = {
  user: null,
  login: async () => {},
  logout: async () => {},
  setProfile: async () => {},
  loading: true,
};

// Create the AuthContext
export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

// Props for AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

// Provider Component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserProfileType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Load user from AsyncStorage on app start
  useEffect(() => {
    const loadUserFromStorage = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (e) {
        console.error('Failed to load user from AsyncStorage:', e);
      } finally {
        setLoading(false);
      }
    };

    loadUserFromStorage();
  }, []);

  // Log in the user
  const login = async (profile: UserProfileType) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(profile));
      setUser(profile);
    } catch (e) {
      console.error('Failed to log in user:', e);
    }
  };

  // Log out the user
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
    } catch (e) {
      console.error('Failed to log out user:', e);
    }
  };

  // Set or update the user profile
  const setProfile = async (profile: UserProfileType) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(profile));
      setUser(profile);
    } catch (e) {
      console.error('Failed to set user profile:', e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, setProfile, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
