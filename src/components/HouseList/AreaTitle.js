import styles from "./AreaTitle.module.css";

function AreaTitle({ areaName, userLike }) {
  return (
    <span
      className={styles.areaButton}
      style={{ borderColor: userLike ? "red" : "#b7b7b7" }} // 동적으로 테두리 색상 변경
    >
      {areaName}
    </span>
  );
}

export default AreaTitle;
