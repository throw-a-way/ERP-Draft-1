import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Role = 'dean' | 'coordinator' | 'hod';

interface User {
  username: string;
  role: Role;
  profileImageUrl?: string; // Optional URL for user's profile image
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (username: string, password: string, role: Role) => Promise<void>;
  signup: (username: string, password: string, role: Role) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const login = async (username: string, password: string /* kept for future backend integration */, role: Role) => {
    // In a real app, you would validate credentials against a backend and get the profile image URL
    setUser({
      username,
      role,
      // This is a placeholder. In a real app, this would come from your backend
      profileImageUrl: `https://api.dicebear.com/7.x/avatars/svg?seed=${username}`,
    });
    setIsAuthenticated(true);
  };

  const signup = async (username: string, password: string /* kept for future backend integration */, role: Role) => {
    // In a real app, you would create a new user in the backend
    setUser({
      username,
      role,
      // This is a placeholder. In a real app, this would come from your backend
      profileImageUrl: `https://api.dicebear.com/7.x/avatars/svg?seed=${username}`,
    });
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};