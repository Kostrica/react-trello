import React from "react";
import { TrelloBoard } from "../TrelloBoard/TrelloBoard";
import { TrelloHeader } from "../TrelloHeader/TrelloHeader";

import styles from "./TrelloApp.module.scss";

export const TrelloApp = () => {
  return (
    <div className={styles.container}>
      <TrelloHeader />
      <TrelloBoard />
    </div>
  );
}
