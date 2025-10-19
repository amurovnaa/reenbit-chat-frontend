import { useState } from "react";
import { FiEdit, FiCheck, FiX } from "react-icons/fi";
import styles from "./Message.module.css";

const Message = ({ message, onUpdate }) => {
  const isUser = message.sender === "user";
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(message.text);

  const startEdit = () => {
    if (isUser) setIsEditing(true);
  };

  const saveEdit = () => {
    if (text.trim()) onUpdate(message._id, text);
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setText(message.text);
    setIsEditing(false);
  };

  return (
    <li className={`${styles.message} ${isUser ? styles.user : styles.bot}`}>
      {isEditing ? (
        <div className={styles.editMessage}>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            autoFocus
            className={styles.editMessageInput}
          />
          <button onClick={saveEdit} className={styles.btnMessage}>
            <FiCheck size={18} color="#27ae60" />
          </button>
          <button onClick={cancelEdit} className={styles.btnMessage}>
            <FiX size={18} color="#e74c3c" />
          </button>
        </div>
      ) : (
        <div className={styles.editMessage}>
          <p className={styles.text}>{message.text}</p>

          {isUser && (
            <button onClick={startEdit} className={styles.btnMessage}>
              <FiEdit size={16} color="#555" />
            </button>
          )}
        </div>
      )}
      <p className={styles.time}>
        {new Date(message.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
    </li>
  );
};

export default Message;
