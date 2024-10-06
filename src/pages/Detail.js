import styles from "./Detail.module.css";
import { useNavigate } from "react-router-dom";
import Stars from "../components/ReviewList/Stars.js";
import FloorButton from "../components/Detail/FloorButton.js";
// import AreaButton from "../components/Detail/AreaButton.js";
import MoneyButton from "../components/Detail/MoneyButton.js";

import GoodButton from "../components/Detail/GoodButton.js";
import BadButton from "../components/Detail/BadButton.js";

import { ReactComponent as ModifyImg } from "../assets/Main/modifyImg.svg";
import { ReactComponent as DeleteImg } from "../assets/Main/deleteImg.svg";

function Detail({ activeReview, token }) {
  const navigate = useNavigate();
  async function handleDelete() {
    const api = `https://backend.kuzip.kr/api/reviews/${activeReview.id}`;
    try {
      await fetch(api, {
        method: "DELETE",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        mode: "cors",
      });
    } catch (error) {
      console.log(error);
    }
    navigate("/home");
  }

  const NavigateToModify = () => {
    navigate("/modify", { state: { activeReview } });
  };

  return (
    <div className={styles.div}>
      {activeReview ? (
        <div className={styles.detailReview}>
          <div className={styles.reviewTop}>
            <span className={styles.exitYear}>
              {activeReview.exit_year}년까지 거주
            </span>
            <span className={styles.reviewSuggest}>
              {activeReview.suggest ? <GoodButton /> : <BadButton />}
            </span>
            {activeReview.is_user && (
              <button
                className={styles.modifyButton}
                onClick={NavigateToModify}
              >
                <ModifyImg />
                <span className={styles.modifyButtonText}>수정하기</span>
              </button>
            )}
            {activeReview.is_user && (
              <button className={styles.deleteButton} onClick={handleDelete}>
                <DeleteImg />
                <span className={styles.deleteButtonText}>삭제하기</span>
              </button>
            )}
          </div>

          <div className={styles.bigStarDiv}>
            <Stars
              className={styles.bigStar}
              rating={activeReview.rating_overall}
              style={{ width: "17vw" }}
            />
          </div>

          <div className={styles.fourRating}>
            <div className={styles.row}>
              <div className={styles.rating}>
                <span className={styles.ratingTitle}>내부</span>
                <Stars
                  rating={activeReview.rating_inside}
                  className={styles.ratingStar}
                  style={{ width: "7.5vw" }}
                />
              </div>
              <div className={styles.rating}>
                <span className={styles.ratingTitle}>교통</span>
                <Stars
                  rating={activeReview.rating_transport}
                  className={styles.ratingStar}
                  style={{ width: "7.5vw" }}
                />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.rating}>
                <span className={styles.ratingTitle}>인프라</span>
                <Stars
                  rating={activeReview.rating_infra}
                  className={styles.ratingStar}
                  style={{ width: "7.5vw" }}
                />
              </div>
              <div className={styles.rating}>
                <span className={styles.ratingTitle}>안전</span>
                <Stars
                  rating={activeReview.rating_safety}
                  className={styles.ratingStar}
                  style={{ width: "7.5vw" }}
                />
              </div>
            </div>
          </div>

          {/* <div className={styles.reviewAddressInfo}>
            <AreaButton area={activeReview.area} />

            <span className={styles.reviewAddress}>{activeReview.address}</span>
          </div> */}

          <div className={styles.reviewMoneyInfo}>
            <FloorButton
              floor={activeReview.floor_type}
              className={styles.reviewFloorButton}
            />
            <span className={styles.moneyButton}>
              <MoneyButton
                rent_type={activeReview.rent_type}
                deposit={activeReview.deposit}
                monthly={activeReview.monthly}
              />
            </span>
            <span className={styles.reviewMaintenance}>
              <span className={styles.reviewMaintenanceText}>관리비</span>
              <span className={styles.reviewMaintenanceInt}>
                {activeReview.maintenance}
              </span>
            </span>
          </div>

          <div className={styles.reviewKeyword}>
            <div className={styles.keywordButtonsContainer}>
              {activeReview.selected_keywords.map((keyword, index) => (
                <span key={index} className={styles.keywordButton}>
                  {keyword.description}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.reviewMerit}>
            <div className={styles.reviewMeritText}>
              실거주자가 알려주는 장점
            </div>
            <div className={styles.reviewMeritContent}>
              {activeReview.merits}
            </div>
          </div>

          <div className={styles.reviewDemerit}>
            <div className={styles.reviewDemeritText}>
              실거주자가 알려주는 단점
            </div>
            <div className={styles.reviewDemeritContent}>
              {activeReview.demerits}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div>선택된 리뷰가 없습니다.</div>
        </>
      )}
    </div>
  );
}

export default Detail;
