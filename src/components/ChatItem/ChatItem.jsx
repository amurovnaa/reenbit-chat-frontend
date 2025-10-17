import styles from "./ChatItem.module.css";

const ChatItem = ({ chat, lastMessage, onSelect, isActive }) => {
  return (
    <li
      key={chat._id}
      className={`${styles.chatItem} ${isActive ? styles.active : ""}`}
      onClick={onSelect}
    >
      <img
        src={chat.avatar || "/default-avatar.png"}
        alt={chat.firstName}
        className={styles.avatar}
      />

      <div className={styles.info}>
        <p className={styles.name}>
          {[chat.firstName, chat.lastName].filter(Boolean).join(" ")}
        </p>
        <p className={styles.last}>
          {lastMessage ? lastMessage.text : "No messages yet"}
        </p>
        {lastMessage && (
          <p className={styles.date}>
            {new Date(lastMessage.createdAt).toLocaleString()}
          </p>
        )}
      </div>
    </li>
  );
};

export default ChatItem;
