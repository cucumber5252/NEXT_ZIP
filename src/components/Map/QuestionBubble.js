import styles from "./QuestionBubble.module.css";

import { ReactComponent as FeedbackImg } from "../../assets/Main/feedbackImg.svg";

import { Link } from "react-router-dom";
import { useState } from "react";

function QuestionBubble() {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div
        className={styles.questionButtonFlex}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className={`${styles.iconWrapper} ${isOpen ? styles.showIcon : ""}`}
        >
          {/* {isOpen && (
            <Link to="/profile" className={styles.profileIcon}>
              <ProfileImg />
              <span className={styles.p1}>내 정보</span>
            </Link>
          )}
          {isOpen && (
            <Link to="/feedback" className={styles.feedbackIcon}>
              <FeedbackImg />
              <span className={styles.p2}>피드백</span>
            </Link>
          )} */}
        </div>
        <button className={styles.questionIcon}>
          {/* <QuestionImg /> */}
          <Link to="/feedback" className={styles.feedbackIcon}>
            <FeedbackImg />
            {/* <span className={styles.p2}>피드백</span> */}
          </Link>
        </button>
      </div>
    </>
  );
}

export default QuestionBubble;
