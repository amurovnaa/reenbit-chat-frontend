import { useEffect, useState } from "react";
import {
  getChats,
  getMessages,
  sendMessage,
  getLastMessageForChat, // ✅ import this
} from "./api/api";

import ChatList from "./components/ChatList/ChatList";
import ChatWindow from "./components/ChatWindow/ChatWindow";
import styles from "./App.module.css";

export default function App() {
  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [lastMap, setLastMap] = useState({}); // ✅ map of chatId -> lastMessage

  useEffect(() => {
    (async () => {
      const { data: chatsData } = await getChats();
      setChats(chatsData);

      const lastMessagesArr = await Promise.all(
        chatsData.map(async (c) => {
          try {
            const last = await getLastMessageForChat(c._id);
            return { chatId: c._id, last };
          } catch (err) {
            console.warn("Error loading last message:", err);
            return { chatId: c._id, last: null };
          }
        })
      );

      const map = {};
      lastMessagesArr.forEach(({ chatId, last }) => {
        if (last) map[chatId] = last;
      });
      setLastMap(map);
    })();
  }, []);

  const handleSelectChat = async (chat) => {
    setSelectedChat(chat);
    const { data } = await getMessages(chat._id);
    setMessages(data);
  };

  const handleSendMessage = async (text) => {
    if (!selectedChat) return;

    const { data } = await sendMessage({ chatId: selectedChat._id, text });
    setMessages((prev) => [...prev, data]);

    setLastMap((prev) => ({ ...prev, [selectedChat._id]: data }));
  };

  return (
    <div className={styles.app}>
      <ChatList
        chats={chats}
        messagesLastMap={lastMap}
        onSelectChat={handleSelectChat}
        selectedChat={selectedChat}
      />
      <ChatWindow
        chat={selectedChat}
        messages={messages}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
}
