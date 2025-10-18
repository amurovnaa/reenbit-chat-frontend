import { createSelector } from "@reduxjs/toolkit";

export const selectMessagesState = (state) => state.messages;
export const selectMessagesByChat = (chatId) =>
  createSelector(
    (state) => state.messages.byChat,
    (byChat) => byChat[chatId] || []
  );

export const selectMessagesLoading = (state) => state.messages.isLoading;
