import styles from "./Message.module.css";

const Message = ({ message }) => {
  const isUser = message.sender === "user";
  return (
    <li
      key={message._id}
      className={`${styles.message} ${isUser ? styles.user : styles.bot}`}
    >
      <div className={styles.text}>{message.text}</div>
      <div className={styles.time}>
        {new Date(message.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
    </li>
  );
};
export default Message;
