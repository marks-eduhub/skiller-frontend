// 'use client ';
// import React, { createContext, useState, useContext, ReactNode } from 'react';

// // Define types for user data
// interface UserData {
//   username: string;
//   email: string;
// }

// // Define type for context value
// interface UserContextValue {
//   user: UserData | null;
//   login: (userData: UserData) => void;
//   logout: () => void;
// }

// // Create user context
// const UserContext = createContext<UserContextValue | undefined>(undefined);

// // Create user provider component
// export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [user, setUser] = useState<UserData | null>(null);

//   const login = (userData: UserData) => {
//     setUser(userData);
//   };

//   const logout = () => {
//     setUser(null);
//   };

//   return (
//     <UserContext.Provider value={{ user, login, logout }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// // Custom hook to access user context
// export const useUser = () => {
//   const context = useContext(UserContext);
//   if (context === undefined) {
//     throw new Error('useUser must be used within a UserProvider');
//   }
//   return context;
// };

// export default UserContext;

