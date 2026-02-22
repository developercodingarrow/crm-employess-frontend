"use client";
import React, { createContext, useEffect, useState } from "react";
export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const [isFillterOpen, setisFillterOpen] = useState(false); // Default to false
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedLeadMobile, setSelectedLeadMobile] = useState(null);
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);

  const toggleFilter = () => {
    setIsFilterOpen(!isFillterOpen);
  };

  const closeFilter = () => {
    setIsFilterOpen(false);
  };

  const openMobileChat = (lead) => {
    setSelectedLeadMobile(lead);
    setIsMobileChatOpen(true);
  };

  const closeMobileChat = () => {
    setIsMobileChatOpen(false);
    setSelectedLeadMobile(null);
  };
  return (
    <AppContext.Provider
      value={{
        isFilterOpen,
        setIsFilterOpen,
        toggleFilter,
        closeFilter,
        selectedLeadMobile,
        isMobileChatOpen,
        openMobileChat,
        closeMobileChat,
        setSelectedLeadMobile, // Make sure this is included
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
