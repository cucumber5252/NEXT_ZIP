import React, { useState } from "react";
import FirstForm from "../components/Write/FirstForm";
import SecondForm from "../components/Write/SecondForm";
import Keywordselect from "../components/Write/Keywordselect";
import TextReview from "../components/Write/TextReview";
import ShowRating from "../components/Write/ShowRating";
import styles from "./Modify.module.css";
import { useLocation } from "react-router-dom";

const Modify = ({ token }) => {
  const { state } = useLocation();
  const activeReview = state.activeReview;

  const modifiedActiveReview = {
    id: activeReview.id,
    address: activeReview.address,
    name: activeReview.house_name,
    area: activeReview.area_name,
    residenceType: activeReview.house_type,
    floor: activeReview.floor_type,
    moveOutYear: activeReview.exit_year,
    rentType: activeReview.rent_type,
    deposit: activeReview.deposit,
    monthlyRent: activeReview.monthly,
    maintenance: activeReview.maintenance,
    selectedKeywords: activeReview.selected_keywords,
    satisfaction: activeReview.merits,
    disappointment: activeReview.demerits,
    ratings: {
      internal: activeReview.rating_inside,
      transport: activeReview.rating_transport,
      infra: activeReview.rating_infra,
      safety: activeReview.rating_safety,
      overall: activeReview.rating_overall,
      recommend: activeReview.suggest,
    },
  };

  const [step, setStep] = useState(1);
  const [FirstData, setFirstData] = useState(modifiedActiveReview);
  const [SecondData, setSecondData] = useState(modifiedActiveReview);
  const [keywordData, setKeywordData] = useState(modifiedActiveReview);
  const [textReviewData, setTextReviewData] = useState(modifiedActiveReview);
  const [ratingData, setRatingData] = useState(modifiedActiveReview);

  const handleNext = (data) => {
    if (step === 1) {
      setFirstData(data);
    } else if (step === 2) {
      setSecondData(data);
    } else if (step === 3) {
      setKeywordData(data);
    } else if (step === 4) {
      setTextReviewData(data);
    } else if (step === 5) {
      setRatingData(data);
    }
    setStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    setStep((prevStep) => prevStep - 1);
  };

  return (
    <div className={styles.writeDiv}>
      {step === 1 && (
        <FirstForm onNext={handleNext} FirstData={FirstData} isModify={true} />
      )}
      {step === 2 && (
        <SecondForm
          onNext={handleNext}
          onPrev={handlePrev}
          SecondData={SecondData}
          isModify={true}
        />
      )}
      {step === 3 && (
        <Keywordselect
          onNext={handleNext}
          onPrev={handlePrev}
          keywordData={keywordData}
          isModify={true}
        />
      )}
      {step === 4 && (
        <TextReview
          onNext={handleNext}
          onPrev={handlePrev}
          textReviewData={textReviewData}
          isModify={true}
        />
      )}
      {step === 5 && (
        <ShowRating
          onPrev={handlePrev}
          token={token}
          ratingData={ratingData}
          overAllData={{ FirstData, SecondData, keywordData, textReviewData }}
          modifiedActiveReviewId={modifiedActiveReview.id}
          isModify={true}
        />
      )}
    </div>
  );
};

export default Modify;
