import { createSlice } from "@reduxjs/toolkit";
import {
  fetchMessages,
  sendMessageThunk,
  updateMessageThunk,
} from "./operations.js";

const messagesSlice = createSlice({
  name: "messages",
  initialState: {
    byChat: {},
    isLoading: false,
    error: null,
  },
  reducers: {
    addMessageToChat(state, action) {
      const { chatId, message } = action.payload;
      if (!state.byChat[chatId]) state.byChat[chatId] = [];
      state.byChat[chatId].push(message);
    },
    updateMessage: (state, action) => {
      const updatedMessage = action.payload;
      const chatMessages = state.byChat[updatedMessage.chatId];
      if (chatMessages) {
        const index = chatMessages.findIndex(
          (m) => m._id === updatedMessage._id
        );
        if (index !== -1) chatMessages[index] = updatedMessage;
      }
    },
  },
  extraReducers: (builder) => {
    // fetchMessages
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        const { chatId, data } = action.payload;
        state.byChat[chatId] = data;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });

    //sendMessageThunk
    builder
      .addCase(sendMessageThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendMessageThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        const { chatId, message } = action.payload;
        if (!state.byChat[chatId]) state.byChat[chatId] = [];
        state.byChat[chatId].push(message);
      })
      .addCase(sendMessageThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });

    //updateMessageThunk
    builder
      .addCase(updateMessageThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateMessageThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedMessage = action.payload;
        const chatMessages = state.byChat[updatedMessage.chatId];
        if (chatMessages) {
          const index = chatMessages.findIndex(
            (m) => m._id === updatedMessage._id
          );
          if (index !== -1) chatMessages[index] = updatedMessage;
        }
      })
      .addCase(updateMessageThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to update message";
      });
  },
});

export const { addMessageToChat, updateMessage } = messagesSlice.actions;
export const messagesReducer = messagesSlice.reducer;
