import React from "react";
import { ReactComponent as CrossIcon } from "../../assets/img/cross_svgrepo_com.svg"

import Modal from 'react-modal';

import styles from "./Popup.module.scss";

Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '40vw',
    padding: '0',
  },
};

export const Popup = ({ title = "Title", isOpen, handleClose, children }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={handleClose}
    style={customStyles}
  >
    <nav>
      <div className="nav-wrapper blue darken-2 pl20 fs22">
        {title}
        <CrossIcon className="right m20" onClick={handleClose} />
      </div>
    </nav>
    <main className={styles.content}>
      {children}
    </main>
  </Modal>
);
