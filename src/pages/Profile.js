import styles from "./Profile.module.css";
import { useState, useEffect } from "react";
import Detail from "./Detail.js";
import OneHouse from "../components/HouseList/OneHouse.js";
import OneReview from "../components/ReviewList/OneReview.js";
import { Link } from "react-router-dom";

const Profile = ({ myHouseData, setSelectedHouse, token }) => {
  const [myReviews, setMyReviews] = useState([]);
  const [activeMyReview, setActiveMyReview] = useState(null);

  useEffect(() => {
    const fetchMyReviews = async () => {
      try {
        const response = await fetch(
          `https://backend.kuzip.kr/api/user-review/`,
          {
            method: "GET",
            headers: {
              Authorization: `Token ${token}`,
              "Content-Type": "application/json",
            },
            mode: "cors",
          }
        );
        const data = await response.json();
        setMyReviews(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMyReviews();
  }, [token]);

  const handleReviewClick = (review) => {
    if (review === activeMyReview) {
      setActiveMyReview(null);
    } else {
      setActiveMyReview(review);
    }
  };

  return (
    <div className={styles.profileDiv}>
      <div className={styles.profileHouseTitle}>내가 찜한 집 보기</div>
      <div className={styles.houseList}>
        {myHouseData.map((house, index) => (
          <Link to="/detail" key={index}>
            <span
              key={index}
              className={styles.oneHouseMargin}
              onClick={() => setSelectedHouse(house)}
            >
              <OneHouse house={house}></OneHouse>
            </span>
          </Link>
        ))}
      </div>

      <div className={styles.profileReviewTitle}>내가 쓴 리뷰 보기</div>
      <div className={styles.myReviewList}>
        {myReviews.map((review, index) => (
          <div key={index} onClick={() => handleReviewClick(review)}>
            {activeMyReview && activeMyReview.id === review.id ? (
              <Detail activeReview={activeMyReview} token={token} />
            ) : (
              <OneReview review={review}></OneReview>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
