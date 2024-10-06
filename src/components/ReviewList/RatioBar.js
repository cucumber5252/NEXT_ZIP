import styles from "./RatioBar.module.css";

const RatioBar = ({ likeWidth, dislikeWidth }) => {
  return (
    <>
      {likeWidth === "100%" ? (
        <div className={styles.ratioBar}>
          <div className={styles.ratioLikeAll}></div>
        </div>
      ) : dislikeWidth === "100%" ? (
        <div className={styles.ratioBar}>
          <div className={styles.ratioDislikeAll}></div>
        </div>
      ) : (
        <div className={styles.ratioBar}>
          <div className={styles.ratioLike} style={{ width: likeWidth }}></div>
          <div
            className={styles.ratioDislike}
            style={{ width: dislikeWidth }}
          ></div>
        </div>
      )}
    </>
  );
};

export default RatioBar;
