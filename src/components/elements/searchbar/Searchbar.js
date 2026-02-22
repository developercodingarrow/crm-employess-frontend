"use client";
import React, { useState, useEffect } from "react";
import { GoSearch } from "react-icons/go";
import styles from "./searchbar.module.css";
export default function Searchbar(props) {
  const { onSearch } = props;
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value); // Pass search term to parent
  };
  return (
    <div className={styles.searchbar}>
      <span className={styles.search_icon}>
        <GoSearch />
      </span>
      <input
        type="text"
        value={searchValue}
        onChange={handleSearch}
        placeholder="Search projects..."
        className={styles.search_input}
      />
    </div>
  );
}
