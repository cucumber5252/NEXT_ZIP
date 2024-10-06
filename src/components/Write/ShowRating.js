import React, { useState, useEffect, useCallback } from "react";
import styles from "./ShowRating.module.css";
import { ReactComponent as Car } from "../../assets/Write/Car.svg";
import { ReactComponent as GoodButtonImg } from "../../assets/Main/goodButtonImg.svg";
import { ReactComponent as BadButtonImg } from "../../assets/Main/badButtonImg.svg";

import RatingForm from "./RatingForm.js";
import { useNavigate } from "react-router-dom";

const ShowRating = ({
  onPrev,
  ratingData,
  overAllData,
  modifiedActiveReviewId,
  isModify,
}) => {
  const [ratings, setRatings] = useState({
    internal: 0,
    transport: 0,
    infra: 0,
    safety: 0,
    overall: 0,
    recommend: undefined,
  });

  useEffect(() => {
    if (ratingData) {
      setRatings({
        internal: ratingData.ratings.internal,
        transport: ratingData.ratings.transport,
        infra: ratingData.ratings.infra,
        safety: ratingData.ratings.safety,
        overall: ratingData.ratings.overall,
        recommend: ratingData.ratings.recommend,
      });
    }
  }, [ratingData]);

  const handleRatingChange = (category, rating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [category]: rating,
    }));
  };

  const handleRecommend = (isRecommend) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      recommend: isRecommend,
    }));
  };

  const handlePrev = () => {
    onPrev();
  };

  const { FirstData, SecondData, keywordData, textReviewData } = overAllData;

  const keywordPk = keywordData.selectedKeywords.map((dicts) => dicts.pk);

  const jsonData = {
    area: FirstData.area,
    address: FirstData.address,
    name: FirstData.name,
    house_type: FirstData.residenceType,
    rent_type: SecondData.rentType,
    deposit: SecondData.deposit,
    monthly: SecondData.monthlyRent,
    maintenance: SecondData.maintenance,
    floor_type: SecondData.floor,
    exit_year: SecondData.moveOutYear,
    keywords: keywordPk,
    merits: textReviewData.satisfaction,
    demerits: textReviewData.disappointment,
    rating_inside: ratings.internal,
    rating_transport: ratings.transport,
    rating_infra: ratings.infra,
    rating_safety: ratings.safety,
    rating_overall: ratings.overall,
    suggest: ratings.recommend,
  };

  console.log("jsonData", jsonData);

  const formData = new FormData();

  formData.append("json_data", JSON.stringify(jsonData));
  formData.append("image_data", textReviewData.residencePhoto);
  console.log("formData", formData);

  const navigate = useNavigate();

  const sendReview = useCallback(
    (e) => {
      e.preventDefault();

      if (
        ratings.internal === 0 ||
        ratings.transport === 0 ||
        ratings.infra === 0 ||
        ratings.safety === 0 ||
        ratings.overall === 0
      ) {
        alert("모든 평점을 선택해주세요!");
        return;
      } else if (ratings.recommend === undefined) {
        alert("추천 여부를 선택해주세요!");
        return;
      }

      const apiUrlToWrite = "https://backend.kuzip.kr/api/reviews/";

      const apiUrlToModify = `https://backend.kuzip.kr/api/reviews/${modifiedActiveReviewId}/`;

      const apiUrl = isModify ? apiUrlToModify : apiUrlToWrite;
      const token = "542f1aa2ade490ef602b8ac7b0e789b24d374bec";
      // const token = localStorage.getItem("login-token");

      fetch(apiUrl, {
        method: isModify ? "PUT" : "POST",
        headers: {
          Authorization: `Token ${token}`,
        },
        mode: "cors",
        body: formData,
      })
        .then((response) => {
          const data = response.json();
          console.log(data);
          navigate("/profile");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // eslint-disable-next-line
    [isModify, modifiedActiveReviewId, formData]
  );

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event && event.key === "Enter") {
        sendReview();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [sendReview]);

  // useEffect(() => {
  //   console.log(formData);
  // }, [formData]);

  return (
    <div className={styles.container}>
      <form onSubmit={sendReview} className={styles.starContainer}>
        <span className={styles.heading}>평점을 입력해주세요!</span>
        <div className={styles.starDiv}>
          <span className={styles.subHeading}>내부</span>
          <RatingForm
            category="internal"
            rating={ratings.internal}
            onRatingChange={handleRatingChange}
          />
        </div>

        <div className={styles.starDiv}>
          <span className={styles.subHeading}>교통</span>
          <RatingForm
            category="transport"
            rating={ratings.transport}
            onRatingChange={handleRatingChange}
          />
        </div>

        <div className={styles.starDiv}>
          <span className={styles.subHeading}>인프라</span>
          <RatingForm
            category="infra"
            rating={ratings.infra}
            onRatingChange={handleRatingChange}
          />
        </div>

        <div className={styles.starDiv}>
          <span className={styles.subHeading}>안전</span>
          <RatingForm
            category="safety"
            rating={ratings.safety}
            onRatingChange={handleRatingChange}
          />
        </div>

        <div className={styles.starDiv}>
          <span className={styles.subHeading}>전체 만족도</span>
          <RatingForm
            category="overall"
            rating={ratings.overall}
            onRatingChange={handleRatingChange}
          />
        </div>
        <div className={styles.recommendContainer}>
          <span className={styles.subSubHeading}>
            후배들에게 추천해줄만한 집이었나요?
          </span>
          <div className={styles.recommendButtons}>
            <div
              onClick={() => handleRecommend(true)}
              className={
                ratings.recommend === true
                  ? `${styles.recommendButton} ${styles.recommended}`
                  : styles.recommendButton
              }
            >
              <GoodButtonImg
                fill={ratings.recommend === true ? "#4caf50" : "black"}
              />
              <span className={styles.recommendText}>추천</span>
            </div>
            <div
              onClick={() => handleRecommend(false)}
              className={
                ratings.recommend === false
                  ? `${styles.recommendButton} ${styles.notRecommended}`
                  : styles.recommendButton
              }
            >
              <BadButtonImg
                fill={ratings.recommend === false ? "#F44366" : "black"}
              />
              <span className={styles.recommendText}>비추천</span>
            </div>
          </div>
        </div>

        <div className={styles.buttonWrapper}>
          <button className={styles.buttonStyle} onClick={handlePrev}>
            <span className={styles.buttonSpan}>BACK</span>
          </button>
          <button className={styles.buttonStyle} type="submit">
            <span className={styles.buttonSpan}>POST</span>
          </button>
        </div>
      </form>

      <div className={styles.bottom}>
        <div className={styles.bottomCarDiv}>
          <Car className={styles.bottomCar} />
        </div>
        <div className={styles.bottomBox}>
          <span className={styles.bottomText}>완성 직전!</span>
        </div>
      </div>
    </div>
  );
};

export default ShowRating;
