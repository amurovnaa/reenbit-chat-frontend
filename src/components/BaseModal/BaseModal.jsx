import styles from "./BaseModal.module.css";

const BaseModal = ({ isOpen, title, children, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {title && <h3 className={styles.title}>{title}</h3>}
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default BaseModal;
