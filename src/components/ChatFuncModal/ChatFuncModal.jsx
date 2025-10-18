import { useState, useEffect } from "react";

const ChatFuncModal = ({ isOpen, onClose, onSubmit, chat }) => {
  const [firstName, setFirstName] = useState(chat?.firstName || "");
  const [lastName, setLastName] = useState(chat?.lastName || "");

  useEffect(() => {
    if (chat) {
      setFirstName(chat.firstName);
      setLastName(chat.lastName);
    } else {
      setFirstName("");
      setLastName("");
    }
  }, [chat]);

  const handleSubmit = () => {
    if (!firstName || !lastName) return alert("Both fields are required");
    onSubmit({ firstName, lastName });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <input
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First name"
      />
      <input
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Last name"
      />
      <button onClick={handleSubmit}>Save</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default ChatFuncModal;
