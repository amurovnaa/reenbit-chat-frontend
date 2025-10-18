import { createSlice } from "@reduxjs/toolkit";
import {
  fetchChats,
  createChatThunk,
  updateChatThunk,
  deleteChatThunk,
} from "./operations.js";

const chatsSlice = createSlice({
  name: "chats",
  initialState: {
    items: [],
    selectedChat: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    selectChat(state, action) {
      state.selectedChat = action.payload;
      const chat = state.items.find((c) => c._id === action.payload._id);
      if (chat) chat.hasUnread = false;
    },
    updateLastMessage(state, action) {
      const { chatId, message } = action.payload;
      const chat = state.items.find((c) => c._id === chatId);
      if (chat) {
        chat.lastMessage = message;
        if (!state.selectedChat || state.selectedChat._id !== chatId) {
          chat.hasUnread = true;
        }
      }
    },
  },
  extraReducers: (builder) => {
    // Fetch chats
    builder
      .addCase(fetchChats.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.map((chat) => ({
          ...chat,
          hasUnread: false,
        }));
      })
      .addCase(fetchChats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });

    // Create chat
    builder
      .addCase(createChatThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createChatThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push({ ...action.payload, hasUnread: false });
      })
      .addCase(createChatThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });

    // Update chat
    builder
      .addCase(updateChatThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateChatThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items.map((chat) =>
          chat._id === action.payload._id
            ? { ...action.payload, hasUnread: chat.hasUnread }
            : chat
        );
        if (state.selectedChat?._id === action.payload._id) {
          state.selectedChat = {
            ...action.payload,
            hasUnread: state.selectedChat.hasUnread,
          };
        }
      })
      .addCase(updateChatThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });

    // Delete chat
    builder
      .addCase(deleteChatThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteChatThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items.filter((chat) => chat._id !== action.payload);
        if (state.selectedChat?._id === action.payload) {
          state.selectedChat = null;
        }
      })
      .addCase(deleteChatThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { selectChat, updateLastMessage } = chatsSlice.actions;
export const chatsReducer = chatsSlice.reducer;
