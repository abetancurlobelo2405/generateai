import React, { useState } from "react";
import styles from "./index.module.css";
import { ShowButton } from "./ModalWindowElements";

const ModalWindow = ({ text, component, children }) => {
  let [show, setShow] = useState(false);
  return (
    <>
      {show ? (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <button
              className={styles.closeButton}
              onClick={() => setShow((show = !show))}
            >
              X
            </button>
            {children}
          </div>
        </div>
      ) : undefined}
      <ShowButton onClick={() => setShow((show = !show))}>{text}</ShowButton>
    </>
  );
};

export default ModalWindow;
