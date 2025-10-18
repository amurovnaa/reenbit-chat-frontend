import Message from "../Message/Message";
import MessageForm from "../MessageForm/MessageForm.jsx";
import styles from "./ChatWindow.module.css";

const ChatWindow = ({ chat, messages, onSendMessage }) => {
  if (!chat)
    return <div className={styles.empty}>Select a chat to start messaging</div>;

  return (
    <div className={styles.chatWindow}>
      <div className={styles.header}>
        {chat.avatar ? (
          <img
            src={chat.avatar}
            alt={chat.firstName}
            className={styles.avatar}
          />
        ) : (
          <div className={styles.avatarPlaceholder}>
            {chat.firstName?.[0].toUpperCase() || "?"}
          </div>
        )}
        <h3 className={styles.name}>
          {[chat.firstName, chat.lastName].filter(Boolean).join(" ")}
        </h3>
      </div>

      <ul className={styles.messages}>
        {messages.map((msg) => (
          <Message key={msg._id} message={msg} />
        ))}
      </ul>

      <MessageForm onSend={onSendMessage} />
    </div>
  );
};
export default ChatWindow;
