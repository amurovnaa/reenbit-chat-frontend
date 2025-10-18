import { createSlice } from "@reduxjs/toolkit";
import { fetchMessages, sendMessageThunk } from "./operations.js";

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
  },
});

export const { addMessageToChat } = messagesSlice.actions;
export const messagesReducer = messagesSlice.reducer;
