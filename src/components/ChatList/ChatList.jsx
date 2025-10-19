import { useState, useMemo } from "react";
import ChatItem from "../ChatItem/ChatItem";
import styles from "./ChatList.module.css";
import { FiEdit2 } from "react-icons/fi";
import UserHeader from "../UserHeader/UserHeader.jsx";

const ChatList = ({
  chats = [],
  messagesLastMap = {},
  onSelectChat,
  selectedChat,
  onEdit,
  onDelete,
  onCreate,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredChats = useMemo(() => {
    if (!searchTerm) return chats;

    const lowerSearch = searchTerm.toLowerCase();
    return chats.filter(
      (chat) =>
        chat.firstName.toLowerCase().includes(lowerSearch) ||
        chat.lastName.toLowerCase().includes(lowerSearch)
    );
  }, [chats, searchTerm]);

  return (
    <div className={styles.chatList}>
      <UserHeader />
      <div className={styles.searchWrapper}>
        <input
          type="text"
          placeholder="Search or start new chat"
          className={styles.search}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <svg className={styles.searchIcon}>
          <use href="/sprite.svg#icon-search-input"></use>
        </svg>
      </div>
      <button className={styles.newChatBtn} onClick={onCreate}>
        <FiEdit2 size={24} />
      </button>
      <h3 className={styles.title}>Chats</h3>
      <ul className={styles.list}>
        {filteredChats.map((chat) => {
          const lastMessage =
            messagesLastMap[chat._id] ?? chat.lastMessage ?? null;

          return (
            <ChatItem
              key={chat._id}
              chat={chat}
              lastMessage={lastMessage}
              isActive={selectedChat?._id === chat._id}
              onClick={() => onSelectChat(chat)}
              onEdit={onEdit}
              onDelete={onDelete}
            ></ChatItem>
          );
        })}
      </ul>
    </div>
  );
};

export default ChatList;
