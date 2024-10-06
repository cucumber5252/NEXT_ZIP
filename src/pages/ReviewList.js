import styles from "./ReviewList.module.css";
import React, { useState, useEffect } from "react";
import OneReview from "../components/ReviewList/OneReview.js";
import Detail from "./Detail.js";
import ReviewAreaTitle from "../components/ReviewList/ReviewAreaTitle.js";
import RatioBar from "../components/ReviewList/RatioBar.js";

import { ReactComponent as GoodButtonImg } from "../assets/Main/goodButtonImg.svg";
import { ReactComponent as BadButtonImg } from "../assets/Main/badButtonImg.svg";
import { ReactComponent as LikeButton } from "../assets/Main/likeButton.svg";

const ReviewList = ({
  selectedHouse,
  setSelectedHouse,
  setMapInitial,
  isLiked,
  setIsLiked,
  token,
}) => {
  const [allReviews, setAllReviews] = useState([]);

  const [activeReview, setActiveReview] = useState(null);

  useEffect(() => {
    console.log("selectedHouse가 변경되었습니다:", selectedHouse);
  }, [selectedHouse]);

  // useEffect(() => {
  //   console.log("isLiked가 변경되었습니다:", isLiked);
  // }, [isLiked]);

  // useEffect(() => {
  //   console.log("allReviews가 변경되었습니다:", allReviews);
  // }, [allReviews]);

  //   useEffect(() => {
  //     console.log("setActiveReview가 변경되었습니다:", activeReview);
  //   }, [activeReview]);

  useEffect(() => {
    if (selectedHouse) {
      setIsLiked(selectedHouse.is_interested);
    }
  }, [selectedHouse, setIsLiked]);

  //서버에서 리뷰 데이터 가져오기
  useEffect(() => {
    if (!selectedHouse) return;
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `https://backend.kuzip.kr/api/houses/${selectedHouse.id}`,
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
        setAllReviews(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchReviews();
  }, [selectedHouse, token]);

  const handleReviewClick = (review) => {
    if (review === activeReview) {
      setActiveReview(null);
    } else {
      setActiveReview(review);
    }
  };

  const suggestRatio = selectedHouse ? selectedHouse.suggest_ratio : 0;
  const likeWidth = `${Math.max(suggestRatio, 0) * 100}%`;
  const dislikeWidth = `${Math.max(1 - suggestRatio, 0) * 100}%`;

  const goBack = () => {
    setSelectedHouse(null); // 선택된 주택 및 리뷰 초기화
    setMapInitial(true); // 지도 변경
  };

  //찜하기 버튼 컨트롤
  //찜 추가하기
  const addLike = async (houseId) => {
    try {
      const response = await fetch(
        "https://backend.kuzip.kr/api/user-interest/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({
            house_pk: houseId,
          }), // 요청 바디를 JSON 문자열로 변환하여 전달
          mode: "cors",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add like!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // 찜 취소 API 추가 (DELETE)
  const removeLike = async (houseId) => {
    try {
      const response = await fetch(
        `https://backend.kuzip.kr/api/user-interest/house/${houseId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          mode: "cors",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove like!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLikeButtonClick = async () => {
    const houseId = selectedHouse.id;

    if (!isLiked) {
      await addLike(houseId);
      setIsLiked(true);
      selectedHouse.is_interested = true;
    } else {
      await removeLike(houseId);
      setIsLiked(false);
      selectedHouse.is_interested = false;
    }
  };

  return (
    <div className={styles.div}>
      {selectedHouse ? (
        <>
          <div className={styles.likeButton}>
            <div
              className={styles.likeButtonDiv}
              onClick={handleLikeButtonClick}
            >
              <LikeButton fill={isLiked ? "#f44366" : "lightgray"} />
              <span className={styles.likeButtonSpan}>이 집 찜하기</span>
            </div>
          </div>
          <div className={styles.OneReviewHouseDiv}>
            <div className={styles.OneReviewHouseTitle}>
              <ReviewAreaTitle
                area_name={selectedHouse.area_name}
                className={styles.houseArea}
              />
              <span className={styles.houseAddress}>
                {selectedHouse.address}
              </span>
            </div>
            <div className={styles.OneReviewRatioTitle}>
              <span className={styles.ButtonSpan}>
                <GoodButtonImg fill="#4caf50" />
                <span className={styles.OneReviewLike}>추천</span>
              </span>
              <span className={styles.BadButtonSpan}>
                <BadButtonImg fill="#f44366" />
                <span className={styles.OneReviewDislike}>비추천</span>
              </span>
            </div>
            <RatioBar likeWidth={likeWidth} dislikeWidth={dislikeWidth} />
          </div>

          <div className={styles.backButtonDiv}>
            <button onClick={goBack} className={styles.backButton}>
              목록으로 돌아가기
            </button>
          </div>
        </>
      ) : (
        <div>선택된 주택이 없습니다.</div>
      )}

      {allReviews.map((review, index) => (
        <div key={index} onClick={() => handleReviewClick(review)}>
          {activeReview && activeReview.id === review.id ? (
            <Detail activeReview={activeReview} token={token} />
          ) : (
            <OneReview review={review}></OneReview>
          )}
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
