import { useState, useEffect, useCallback } from "react";
import styles from "./TextReview.module.css";
import { ReactComponent as Car } from "../../assets/Write/Car.svg";

const TextReview = ({ onNext, onPrev, textReviewData }) => {
  const [satisfaction, setSatisfaction] = useState("");
  const [disappointment, setDisappointment] = useState("");
  const [residencePhoto, setResidencePhoto] = useState(null);
  const [residencePhotoPreview, setResidencePhotoPreview] = useState("");

  useEffect(() => {
    console.log("residencePhoto: ", residencePhoto);
  }, [residencePhoto]);

  useEffect(() => {
    console.log("residencePhotoPreview: ", residencePhotoPreview);
  }, [residencePhotoPreview]);

  useEffect(() => {
    if (textReviewData) {
      setSatisfaction(textReviewData.satisfaction);
      setDisappointment(textReviewData.disappointment);
    }
  }, [textReviewData]);

  const handleSatisfactionChange = (e) => {
    setSatisfaction(e.target.value);
  };

  const handleDisappointmentChange = (e) => {
    setDisappointment(e.target.value);
  };

  const handleResidencePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResidencePhoto(file);
      setResidencePhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleNext = useCallback(
    (e) => {
      e.preventDefault();

      // if (satisfaction.length < 20 || disappointment.length < 20) {
      //   alert("20자 이상 작성해주세요!");
      //   return;
      // }
      const data = {
        satisfaction,
        disappointment,
        residencePhoto,
      };
      onNext(data);
    },
    [satisfaction, disappointment, residencePhoto, onNext]
  );

  const handlePrev = () => {
    onPrev();
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        handleNext(event);
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleNext]);

  return (
    <div className={styles.textReviewContainer}>
      <form onSubmit={handleNext} className={styles.formContainer}>
        <div className={styles.satisfy}>
          <label htmlFor="satisfaction" className={styles.headingLabel}>
            <span className={styles.heading}>살아봤더니 만족스러웠던 부분</span>
          </label>
          <textarea
            id="satisfaction"
            value={satisfaction}
            onChange={handleSatisfactionChange}
            placeholder="살면서 만족했던 부분에 대해 20자 이상 자유롭게 작성해주세요!"
          />
        </div>

        <div className={styles.silmang}>
          <label htmlFor="disappointment" className={styles.headingLabel}>
            <span className={styles.heading}>살아봤더니 실망스러웠던 부분</span>
          </label>
          <textarea
            id="disappointment"
            value={disappointment}
            onChange={handleDisappointmentChange}
            placeholder="살면서 만족했던 부분에 대해 20자 이상 자유롭게 작성해주세요!"
          />
        </div>

        <div className={styles.customFileInput}>
          <div>
            <span className={styles.heading}>
              도움이 될 만한 실제 집 사진이 있다면 추가로 업로드해주세요!
            </span>
          </div>
          <label htmlFor="residencePhoto">
            {residencePhotoPreview ? (
              <img
                src={residencePhotoPreview}
                alt="Residence"
                style={{ width: "20vw" }}
              />
            ) : (
              <span className={styles.customFileInputYet}>Upload</span>
            )}
          </label>
          <input
            placeholder="후배들에게 도움이 될 만한 실제 집 사진이 있다면 업로드 해주세요!"
            type="file"
            id="residencePhoto"
            accept="image/*"
            onChange={handleResidencePhotoChange}
          />
        </div>
        <div className={styles.buttonWrapper}>
          <button className={styles.buttonStyle} onClick={handlePrev}>
            <span className={styles.buttonSpan}>BACK</span>
          </button>
          <button className={styles.buttonStyle} type="submit">
            <span className={styles.buttonSpan}>NEXT</span>
          </button>
        </div>
      </form>

      <div className={styles.bottom}>
        <div className={styles.bottomCarDiv}>
          <Car className={styles.bottomCar} />
        </div>
        <div className={styles.bottomBox}>
          <span className={styles.bottomText}>거의 완료!</span>
        </div>
      </div>
    </div>
  );
};

export default TextReview;
