//TODO: AUTHENTICATION
import { createContext, PropsWithChildren } from "react";
import { UserContextType } from "../types/types";

export const UserStateContext = createContext<UserContextType>({});

const UserStateProvider: React.FC<PropsWithChildren> = ({
  children,
  value,
}) => {
  return (
    <UserStateContext.Provider value={value}>
      {children}
    </UserStateContext.Provider>
  );
};

export default UserStateProvider;
