import React, { useState } from "react";
import styles from "./index.module.css";
import { BiExpand } from "react-icons/bi";

const ModalPosts = ({ author, rawText, images, children }) => {
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

            <div className={styles.modalContainer}>
              <div className={styles.modalImageContainer}>
                {images &&
                  images.map((image, index) => (
                    <>
                      <img className={styles.modalImage} src={image}></img>
                    </>
                  ))}
              </div>
              <div className={styles.modalInfo}>
                <div className={styles.authorContainer}>
                  <p>{author}</p>
                </div>
                <p className={styles.rawTextContainer}>
                  &quot;{rawText} &quot;
                </p>
                <div className={styles.textContainer}>
                  <p className={styles.text}>{children}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : undefined}
      <div
        className={styles.expandButton}
        onClick={() => setShow((show = !show))}
      >
        <BiExpand />
      </div>
    </>
  );
};

export default ModalPosts;
