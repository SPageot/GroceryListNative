//TODO: AUTHENTICATION
import { useState, createContext, PropsWithChildren } from "react";
import { UserContextType } from "../types/types";

export const UserStateContext = createContext<UserContextType>({});

const UserStateProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState();

  return (
    <UserStateContext.Provider value={{ setUser, user }}>
      {children}
    </UserStateContext.Provider>
  );
};

export default UserStateProvider;
