import React, { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setuser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState();
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const history = useHistory();
  // console.log(history.location.pathname);
  useEffect(() => {
    if (!isLoggedIn) {
      history.push("/");
    }
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setuser(userInfo);
  }, [isLoggedIn]);

  return (
    <ChatContext.Provider
      value={{
        user,
        setuser,
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
        isLoggedIn,
        setLoggedIn,
        notifications,
        setNotifications,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
