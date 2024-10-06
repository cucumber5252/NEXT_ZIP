import React, { useState, useEffect } from "react";
import FirstForm from "../components/Write/FirstForm";
import SecondForm from "../components/Write/SecondForm";
import Keywordselect from "../components/Write/Keywordselect";
import TextReview from "../components/Write/TextReview";
import ShowRating from "../components/Write/ShowRating";
import styles from "./Write.module.css";

const Write = (token) => {
  const [step, setStep] = useState(1);
  const [FirstData, setFirstData] = useState(null);
  const [SecondData, setSecondData] = useState(null);
  const [keywordData, setKeywordData] = useState(null);
  const [textReviewData, setTextReviewData] = useState(null);
  const [ratingData, setRatingData] = useState(null);

  const onNext = (data) => {
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

  const onPrev = () => {
    setStep((prevStep) => prevStep - 1);
  };

  useEffect(() => {
    console.log("SecondData: ", SecondData);
  }, [SecondData]);

  return (
    <div className={styles.writeDiv}>
      {step === 1 && (
        <FirstForm onNext={onNext} FirstData={FirstData} isModify={false} />
      )}
      {step === 2 && (
        <SecondForm
          onNext={onNext}
          onPrev={onPrev}
          SecondData={SecondData}
          isModify={false}
        />
      )}
      {step === 3 && (
        <Keywordselect
          onNext={onNext}
          onPrev={onPrev}
          keywordData={keywordData}
          isModify={false}
        />
      )}
      {step === 4 && (
        <TextReview
          onNext={onNext}
          onPrev={onPrev}
          textReviewData={textReviewData}
          isModify={false}
        />
      )}
      {step === 5 && (
        <ShowRating
          onPrev={onPrev}
          token={token}
          ratingData={ratingData}
          overAllData={{
            FirstData,
            SecondData,
            keywordData,
            textReviewData,
          }}
          isModify={false}
        />
      )}
    </div>
  );
};

export default Write;
