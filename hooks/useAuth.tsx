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
    if (login.user && login.token) {
      setIsLoading(true);
      setUserToken(login.token);
      AsyncStorage.setItem("userToken", login.token);
      AsyncStorage.setItem("user", JSON.stringify(login.user));
      setUser(login.user);
      setIsLoading(false);
    }
  };

  const logoutUser = () => {
    setIsLoading(true);
    setUserToken(null);
    AsyncStorage.removeItem("userToken");
    AsyncStorage.removeItem("user");
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      const getUserToken = await AsyncStorage.getItem("userToken");
      const getUser = await AsyncStorage.getItem("user");
      setUserToken(getUserToken);
      setUser(JSON.parse(getUser));
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
