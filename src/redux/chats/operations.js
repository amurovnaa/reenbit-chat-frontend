import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createChat,
  deleteChat,
  getChats,
  getLastMessageForChat,
  updateChat,
} from "../../api/api";

export const fetchChats = createAsyncThunk("chats/fetchAll", async () => {
  const { data } = await getChats();

  const withLast = await Promise.all(
    data.map(async (chat) => {
      const last = await getLastMessageForChat(chat._id);
      return { ...chat, lastMessage: last || null };
    })
  );

  return withLast;
});

export const createChatThunk = createAsyncThunk(
  "chats/create",
  async ({ firstName, lastName }) => {
    const { data } = await createChat({ firstName, lastName });
    return data;
  }
);

export const updateChatThunk = createAsyncThunk(
  "chats/update",
  async ({ id, firstName, lastName }) => {
    const { data } = await updateChat(id, { firstName, lastName });
    return data;
  }
);

export const deleteChatThunk = createAsyncThunk("chats/delete", async (id) => {
  await deleteChat(id);
  return id;
});
