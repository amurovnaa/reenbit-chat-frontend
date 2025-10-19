import { createAsyncThunk } from "@reduxjs/toolkit";
import { getMessages, sendMessage, updateMessage } from "../../api/api.js";

export const fetchMessages = createAsyncThunk(
  "messages/fetchByChat",
  async (chatId) => {
    const { data } = await getMessages(chatId);
    return { chatId, data };
  }
);

export const sendMessageThunk = createAsyncThunk(
  "messages/send",
  async ({ chatId, text }, { dispatch }) => {
    const { data } = await sendMessage({ chatId, text });
    dispatch(updateLastMessage({ chatId, message: data }));
    return { chatId, message: data };
  }
);

export const updateMessageThunk = createAsyncThunk(
  "messages/updateMessage",
  async ({ messageId, text }, { rejectWithValue }) => {
    try {
      const { data } = await updateMessage(messageId, text);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to update message"
      );
    }
  }
);
