import React, { useState } from "react";
import styles from "./index.module.css";

const ModalPosts = ({ author, rawText, children }) => {
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
            <p>{author}</p>
            <p className={styles.rawTextContainer}> &quot;{rawText} &quot;</p>
            <div className={styles.textContainer}>{children}</div>
          </div>
        </div>
      ) : undefined}
      <button
        className={styles.expandButton}
        onClick={() => setShow((show = !show))}
      >
        Expand
      </button>
    </>
  );
};

export default ModalPosts;
