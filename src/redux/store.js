import { configureStore } from "@reduxjs/toolkit";
import { messagesReducer } from "./messages/slice.js";
import { chatsReducer } from "./chats/slice.js";

export const store = configureStore({
  reducer: {
    chats: chatsReducer,
    messages: messagesReducer,
  },
});
