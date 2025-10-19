import styles from "./UserHeader.module.css";

const UserHeader = ({ user, onLogin }) => {
  return (
    <header className={styles.header}>
      <div className={styles.avatarWrapper}>
        {user?.avatar ? (
          <img src={user.avatar} alt={user.name} className={styles.avatar} />
        ) : (
          <div className={styles.avatarPlaceholder}>
            {user?.name?.[0]?.toUpperCase() || "?"}
          </div>
        )}
      </div>

      {!user && (
        <button className={styles.loginBtn} onClick={onLogin}>
          Login
        </button>
      )}
    </header>
  );
};

export default UserHeader;
