"use client";
import { useUser } from "@clerk/nextjs";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

// Provider component
export const UserProvider = ({ children }) => {
  const { isSignedIn, user, isLoaded } = useUser();
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      setUserId(user.id);
      setUserName(user.fullName);
      setImgUrl(user.imageUrl);
    }
  }, [isLoaded, isSignedIn, user]);

  return (
    <UserContext.Provider value={{ userId, userName, imgUrl }}>
      {children}
    </UserContext.Provider>
  );
};
