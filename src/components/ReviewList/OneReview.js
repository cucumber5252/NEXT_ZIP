import styles from "./OneReview.module.css";

import Stars from "./Stars.js";

import GoodButton from "../Button/GoodButton.js";
import BadButton from "../Button/BadButton.js";
import MoneyButton from "../Detail/MoneyButton.js";

function OneReview({ review }) {
  return (
    <div className={styles.OneReview}>
      <div className={styles.buttonDiv}>
        <span className={styles.exit_year}>{review.exit_year}년까지 거주</span>
        {/* <span className={styles.address}>{review.address}</span> */}
        <MoneyButton
          rent_type={review.rent_type}
          deposit={review.deposit}
          monthly={review.monthly}
        />
      </div>

      <div className={styles.star}></div>
      <Stars rating={review.rating_overall} style={{ width: "13vw" }} />
      <div className={styles.button}>
        {review.suggest ? <GoodButton /> : <BadButton />}
      </div>
    </div>
  );
}

export default OneReview;
