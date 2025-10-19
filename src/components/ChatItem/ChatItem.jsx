import { FiEdit2, FiTrash2 } from "react-icons/fi";
import styles from "./ChatItem.module.css";
import BaseModal from "../BaseModal/BaseModal.jsx";
import { useState } from "react";

const ChatItem = ({
  chat,
  lastMessage = null,
  onClick,
  isActive = false,
  onEdit,
  onDelete,
}) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    onDelete(chat._id);
    setShowConfirm(false);
  };

  return (
    <li
      className={`${styles.chatItem} ${isActive ? styles.active : ""}`}
      onClick={onClick}
    >
      <div className={styles.userInfo}>
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
        <div>
          <p className={styles.name}>
            {[chat.firstName, chat.lastName].filter(Boolean).join(" ")}
            {chat.hasUnread && <span className={styles.unreadIcon}>New</span>}
          </p>

          <p className={styles.last}>
            {lastMessage?.text ?? "No messages yet"}{" "}
          </p>
        </div>
      </div>

      <div className={styles.chatInfo}>
        <p className={styles.date}>
          {new Date(lastMessage?.createdAt || chat.createdAt)
            .toLocaleDateString("en-US", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
            .replace(/ /g, " ")
            .toLowerCase()}{" "}
        </p>
        <div className={styles.actions}>
          <FiEdit2
            className={styles.icon}
            title="Edit chat"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(chat);
            }}
          />
          <FiTrash2
            className={`${styles.icon} ${styles.delete}`}
            title="Delete chat"
            onClick={(e) => {
              e.stopPropagation();
              setShowConfirm(true);
            }}
          />
        </div>

        <BaseModal
          isOpen={showConfirm}
          title="Delete Chat"
          onClose={() => setShowConfirm(false)}
        >
          <p className={styles.modalText}>
            Are you sure you want to delete this chat?
          </p>
          <div className={styles.modalButtons}>
            <button onClick={handleDelete} className={styles.confirmBtn}>
              Yes
            </button>
            <button
              onClick={() => setShowConfirm(false)}
              className={styles.cancelBtn}
            >
              No
            </button>
          </div>
        </BaseModal>
      </div>
    </li>
  );
};

export default ChatItem;
