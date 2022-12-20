import React, { useEffect, useState } from "react";
import styles from "./index.module.css";

const Plans = ({ children, showModal }) => {
  const [showPlans, setShowPlans] = useState(true);

  const modalHandler = (handler) => {
    if (handler) {
      setShowPlans(false);
    } else {
      setShowPlans(true);
    }
  };

  useEffect(() => {
    if (showModal) {
      setShowPlans(false);
    }
  }, [showModal]);

  return (
    <>
      <button onClick={() => modalHandler(false)}>MOSTRAR PLANES</button>
      <div className={showPlans ? styles.showPlans : styles.hidePlans}>
        <h1 className={styles.title}>Plansitos</h1>
        {children}
        <button onClick={() => modalHandler(true)}>CLOSE</button>
      </div>
    </>
  );
};

export default Plans;
