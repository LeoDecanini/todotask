import { createContext, useState, useEffect, useContext, FC } from "react";
import { useSession } from "next-auth/react";

const UserContext = createContext<any>(undefined);

export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      setUser(session.user);
    }
  }, [session]);

  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
