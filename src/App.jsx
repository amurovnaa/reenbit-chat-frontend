import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatList from "./components/ChatList/ChatList";
import ChatWindow from "./components/ChatWindow/ChatWindow";
import styles from "./App.module.css";

import {
  selectChats,
  selectChatsLoading,
  selectSelectedChat,
} from "./redux/chats/selectors.js";
import { selectMessagesByChat } from "./redux/messages/selectors.js";
import { selectChat, updateLastMessage } from "./redux/chats/slice.js";
import {
  fetchMessages,
  sendMessageThunk,
  updateMessageThunk,
} from "./redux/messages/operations.js";
import {
  createChatThunk,
  deleteChatThunk,
  fetchChats,
  updateChatThunk,
} from "./redux/chats/operations.js";
import ChatFuncModal from "./components/ChatFuncModal/ChatFuncModal.jsx";
import { addMessageToChat } from "./redux/messages/slice.js";
import { socket } from "./api/api.js";
import toast, { Toaster } from "react-hot-toast";
import Loader from "./components/Loader/Loader.jsx";

export default function App() {
  const dispatch = useDispatch();

  const chats = useSelector(selectChats);
  const selectedChat = useSelector(selectSelectedChat);
  const isLoading = useSelector(selectChatsLoading);
  const messagesByChatSelector = selectMessagesByChat(selectedChat?._id || "");
  const messagesByChat = useSelector(messagesByChatSelector);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingChat, setEditingChat] = useState(null);

  useEffect(() => {
    dispatch(fetchChats());
  }, [dispatch]);

  useEffect(() => {
    const handleNewMessage = ({ chatId, message }) => {
      dispatch(addMessageToChat({ chatId, message }));
      dispatch(updateLastMessage({ chatId, message }));

      if (!selectedChat || selectedChat._id !== chatId) {
        const chat = chats.find((c) => c._id === chatId);
        const chatName = chat
          ? `${chat.firstName} ${chat.lastName}`
          : "Unknown Chat";
        toast(`${chatName}: ${message.text}`, { duration: 5000 });
      }
    };

    socket.on("newMessage", handleNewMessage);
    return () => socket.off("newMessage", handleNewMessage);
  }, [dispatch, selectedChat, chats]);

  const handleSendMessage = (text) => {
    if (!selectedChat) return;
    const tempMessage = {
      _id: Date.now().toString(),
      chatId: selectedChat._id,
      sender: "user",
      text,
      createdAt: new Date().toISOString(),
    };
    dispatch(
      addMessageToChat({ chatId: selectedChat._id, message: tempMessage })
    );
    dispatch(sendMessageThunk({ chatId: selectedChat._id, text }));
  };

  const handleUpdateMessage = (id, newText) => {
    dispatch(updateMessageThunk({ messageId: id, text: newText }));
  };

  const handleSelectChat = (chat) => {
    dispatch(selectChat(chat));
    dispatch(fetchMessages(chat._id));
  };

  const openCreateModal = () => {
    setEditingChat(null);
    setModalOpen(true);
  };

  const handleEdit = (chat) => {
    setEditingChat(chat);
    setModalOpen(true);
  };

  const handleModalSubmit = (formData) => {
    if (editingChat && editingChat._id) {
      dispatch(updateChatThunk({ id: editingChat._id, formData }));
    } else {
      dispatch(createChatThunk(formData));
    }
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    dispatch(deleteChatThunk(id));
  };

  return (
    <section className={styles.app}>
      <Toaster position="top-center" />
      {isLoading && <Loader />}
      <ChatList
        chats={chats}
        onSelectChat={handleSelectChat}
        selectedChat={selectedChat}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={openCreateModal}
      />

      <ChatWindow
        chat={selectedChat}
        messages={messagesByChat || []}
        onSendMessage={handleSendMessage}
        onUpdateMessage={handleUpdateMessage}
      />

      <ChatFuncModal
        isOpen={modalOpen}
        chat={editingChat}
        onClose={() => setModalOpen(false)}
        onSubmit={handleModalSubmit}
      />
    </section>
  );
}
