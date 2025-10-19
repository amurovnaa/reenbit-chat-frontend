import { useState, useEffect } from "react";
import styles from "./ChatFuncModal.module.css";

const ChatFuncModal = ({ isOpen, onClose, onSubmit, chat }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  useEffect(() => {
    if (chat) {
      setFirstName(chat.firstName || "");
      setLastName(chat.lastName || "");
      setAvatarPreview(chat.avatar || null);
      setAvatarFile(null);
    } else {
      setFirstName("");
      setLastName("");
      setAvatarPreview(null);
      setAvatarFile(null);
    }
  }, [chat]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstName || !lastName) {
      alert("First name and Last name are required");
      return;
    }

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    if (avatarFile) formData.append("avatar", avatarFile);

    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3 className={styles.title}>
          {chat ? "Edit Chat" : "Create New Chat"}
        </h3>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.avatarSection}>
            <label className={styles.avatarLabel}>
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Avatar preview"
                  className={styles.avatarPreview}
                />
              ) : (
                <div className={styles.avatarPlaceholder}>+</div>
              )}
              <input
                type="file"
                accept="image/*"
                className={styles.fileInput}
                onChange={handleFileChange}
              />
            </label>
          </div>

          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First name"
            className={styles.input}
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last name"
            className={styles.input}
          />

          <div className={styles.buttons}>
            <button type="submit" className={styles.saveBtn}>
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelBtn}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatFuncModal;
