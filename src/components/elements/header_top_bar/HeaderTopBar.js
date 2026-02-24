import React from "react";
import styles from "./headertopbar.module.css";
import { GoPlus, GoFilter } from "react-icons/go";
import ClickBtn from "../buttons/ClickBtn";
export default function HeaderTopBar(props) {
  const { pageTitle, pageSubtitle, btnText, btnClickHandel } = props;

  return (
    <div className={styles.page_topBar}>
      <div>
        <h1 className={styles.page_title}>{pageTitle}</h1>
        <p className={styles.page_subtitle}>{pageSubtitle}</p>
      </div>

      {btnText && <ClickBtn btnText={btnText} ClickHandel={btnClickHandel} />}
    </div>
  );
}
