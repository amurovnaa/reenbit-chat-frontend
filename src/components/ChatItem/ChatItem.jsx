import styles from "./ChatItem.module.css";

const ChatItem = ({ chat, lastMessage = null, onClick, isActive = false }) => {
  return (
    <li
      className={`${styles.chatItem} ${isActive ? styles.active : ""}`}
      onClick={onClick}
    >
      {chat.avatar ? (
        <img src={chat.avatar} alt={chat.firstName} className={styles.avatar} />
      ) : (
        <div className={styles.avatarPlaceholder}>
          {chat.firstName?.[0].toUpperCase() || "?"}
        </div>
      )}

      <div className={styles.info}>
        <p className={styles.name}>
          {[chat.firstName, chat.lastName].filter(Boolean).join(" ")}
          {chat.hasUnread && <span className={styles.unreadIcon}></span>}
        </p>
        <p className={styles.last}>{lastMessage?.text ?? "No messages yet"}</p>
        {lastMessage?.createdAt && (
          <p className={styles.date}>
            {new Date(lastMessage.createdAt).toLocaleString()}
          </p>
        )}
      </div>
    </li>
  );
};

export default ChatItem;
