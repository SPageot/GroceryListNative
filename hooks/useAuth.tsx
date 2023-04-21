//TODO: AUTHENTICATION
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { UserContextType } from "../types/types";

export const UserStateContext = createContext<UserContextType>({});

const UserStateProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [user, setUser] = useState();

  const loginUser = (login) => {
    setIsLoading(true);
    setUserToken(login.token);
    AsyncStorage.setItem("userToken", login.token);
    setUser(login.user);
    setIsLoading(false);
  };

  const logoutUser = () => {
    setIsLoading(true);
    setUserToken(null);
    AsyncStorage.removeItem("userToken");
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      const getUserToken = await AsyncStorage.getItem("userToken");
  
      setUserToken(getUserToken);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);
  

  return (
    <UserStateContext.Provider
      value={{ loginUser, logoutUser, isLoading, userToken, isLoggedIn, user }}
    >
      {children}
    </UserStateContext.Provider>
  );
};

export default UserStateProvider;
