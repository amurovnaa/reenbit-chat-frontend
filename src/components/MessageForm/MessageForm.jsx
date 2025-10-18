import { useState } from "react";
import styles from "./MessageForm.module.css";

const MessageForm = ({ onSend }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSend(text);
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.inputBox}>
      <input
        type="text"
        placeholder="Type your message"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className={styles.input}
      />
      <button type="submit" className={styles.button}>
        Submit
      </button>
    </form>
  );
};
export default MessageForm;
