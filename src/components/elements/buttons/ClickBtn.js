import React from "react";
import styles from "./clickbtn.module.css";
import { GoPlus, GoFilter } from "react-icons/go";
export default function ClickBtn(props) {
  const { btnText, ClickHandel } = props;

  const handelClick = () => {
    ClickHandel();
  };

  return (
    <div className={styles.button_container} onClick={handelClick}>
      <button className={styles.bar_button}>
        <GoPlus className={styles.button_icon} />
        <span className={styles.btn_text}>{btnText}</span>
      </button>
    </div>
  );
}
