import { ReactComponent as StarImg } from "../../assets/Main/star.svg";
import styles from "./RatingForm.module.css";

const RatingForm = ({ category, rating, onRatingChange }) => {
  const handleRatingClick = (selectedRating) => {
    onRatingChange(category, selectedRating);
  };
  return (
    <span>
      <span className={styles.starContainer}>
        {[...Array(5)].map((_, index) => {
          const filledStars = Math.floor(rating);

          return (
            <span
              key={index}
              onClick={() => handleRatingClick(index + 1)}
              className={styles.starSpan}
            >
              <StarImg
                className={`${styles.starImg} ${
                  index < filledStars ? styles.filled : styles.empty
                }`}
              />
            </span>
          );
        })}
      </span>
    </span>
  );
};

export default RatingForm;
