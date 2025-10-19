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
  async (formData) => {
    const { data } = await createChat(formData);
    return data;
  }
);

export const updateChatThunk = createAsyncThunk(
  "chats/update",
  async ({ id, formData }) => {
    const { data } = await updateChat(id, formData);
    return data;
  }
);

export const deleteChatThunk = createAsyncThunk("chats/delete", async (id) => {
  await deleteChat(id);
  return id;
});
