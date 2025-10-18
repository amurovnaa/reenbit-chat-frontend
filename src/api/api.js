import axios from "axios";
import { io } from "socket.io-client";

const BASE_URL = "https://reenbit-chat-backend.onrender.com/";

const api = axios.create({
  baseURL: BASE_URL,
});

// CHATS
export const getChats = () => api.get("/chats");
export const createChat = (chatData) => api.post("/chats", chatData);
export const updateChat = (id, chatData) => api.put(`/chats/${id}`, chatData);
export const deleteChat = (id) => api.delete(`/chats/${id}`);

// MESSAGES
export const getMessages = (chatId) => api.get(`/messages/${chatId}`);
export const sendMessage = (data) => api.post("/messages", data);

export const getLastMessageForChat = async (chatId) => {
  const res = await getMessages(chatId);
  const msgs = res.data || [];
  if (!msgs.length) return null;
  const last = msgs[msgs.length - 1];
  return last;
};

// SOCKETS
export const socket = io(BASE_URL, {
  transports: ["websocket"],
});

export default api;
