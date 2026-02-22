"use client";
import React, { createContext, useEffect, useState } from "react";
export const FillterContext = createContext();

export default function FillterContextProvider({ children }) {
  const [visibleRows, setvisibleRows] = useState([]);
  return (
    <FillterContext.Provider value={{ visibleRows, setvisibleRows }}>
      {children}
    </FillterContext.Provider>
  );
}
