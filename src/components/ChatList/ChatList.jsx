import ChatItem from "../ChatItem/ChatItem";
import styles from "./ChatList.module.css";

const ChatList = ({ chats, messagesLastMap, onSelectChat, selectedChat }) => {
  return (
    <div className={styles.chatList}>
      <input
        type="text"
        placeholder="Search or start new chat"
        className={styles.search}
      />
      <h3 className={styles.title}>Chats</h3>
      <ul className={styles.list}>
        {chats.map((chat) => (
          <ChatItem
            key={chat._id}
            chat={chat}
            lastMessage={messagesLastMap[chat._id] ?? null}
            isActive={selectedChat?._id === chat._id}
            onSelect={() => onSelectChat(chat)}
          />
        ))}
      </ul>
    </div>
  );
};
export default ChatList;
