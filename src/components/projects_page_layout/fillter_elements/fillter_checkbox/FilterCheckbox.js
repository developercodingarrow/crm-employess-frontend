"use client";
import React from "react";
import styles from "./filtercheckbox.module.css";
import { GoCheck } from "react-icons/go";

export default function FilterCheckbox(props) {
  const { label, value, selectedValues = [], onChange } = props;
  const isChecked = selectedValues.includes(value);

  const handleChange = () => {
    let newSelectedValues;

    if (isChecked) {
      newSelectedValues = selectedValues.filter((v) => v !== value);
    } else {
      newSelectedValues = [...selectedValues, value];
    }

    onChange(newSelectedValues);
  };

  return (
    <div className={styles.checkbox_item} onClick={handleChange}>
      <div
        className={`${styles.checkbox_box} ${isChecked ? styles.checked : ""}`}
      >
        {isChecked && <GoCheck className={styles.check_icon} />}
      </div>
      <span className={styles.checkbox_label}>{label}</span>
    </div>
  );
}
