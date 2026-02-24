"use client";
import React, { createContext, useEffect, useState } from "react";
export const AppContext = createContext();

export default function AppContextProvider({ children }) {
  const [isFillterOpen, setisFillterOpen] = useState(false); // Default to false
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedLeadMobile, setSelectedLeadMobile] = useState(null);
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);
  const [isUserFormOpen, setIsUserFormOpen] = useState(false); // Add this
  const [isLeadUplodOpen, setisLeadUplodOpen] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(true); // Toggle between form and bulk upload

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

  const openUserForm = () => setIsUserFormOpen(true); // Add this
  const closeUserForm = () => setIsUserFormOpen(false); // Add this
  const openLeadForm = () => setisLeadUplodOpen(true); // Add this
  const closeLeadForm = () => setisLeadUplodOpen(false); // Add this
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
        isUserFormOpen, // Add this
        openUserForm, // Add this
        closeUserForm, // Add this
        isLeadUplodOpen,
        setisLeadUplodOpen,
        openLeadForm,
        closeLeadForm,
        showCreateForm,
        setShowCreateForm,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
