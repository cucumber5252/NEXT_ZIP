import React, { useState, useEffect, useCallback } from "react";
import styles from "./Keywordselect.module.css";
import { ReactComponent as Car } from "../../assets/Write/Car.svg";
import { AiFillCloseCircle } from "react-icons/ai";

const Keywordselect = ({ onNext, onPrev, keywordData, isModify }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [keywordOptions, setKeywordOptions] = useState({});

  const getKeywords = () => {
    fetch("https://backend.kuzip.kr/api/keywords/", {
      method: "GET",
      mode: "cors",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        return response.json();
      })
      .then((jsonData) => {
        setKeywordOptions({ ...jsonData });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    getKeywords();
  }, []);

  useEffect(() => {
    if (keywordData) {
      setSelectedOption(keywordData.selectedOption);
      setSelectedKeywords(keywordData.selectedKeywords);
    }
  }, [keywordData]);

  // const handleOptionChange = (e) => {
  //   const option = e.target.value;
  //   setSelectedOption(option);
  // };

  const handleKeywordSelect = (keyword) => {
    if (selectedKeywords.includes(keyword)) {
      setSelectedKeywords(selectedKeywords.filter((kw) => kw !== keyword));
    } else {
      setSelectedKeywords([...selectedKeywords, keyword]);
    }
  };

  const handleSelectedKeywordRemove = (keyword) => {
    setSelectedKeywords(selectedKeywords.filter((kw) => kw !== keyword));
  };

  const handleClearSelection = () => {
    setSelectedKeywords([]);
  };

  const handleNext = useCallback(
    (e) => {
      e.preventDefault();
      const data = {
        selectedOption,
        selectedKeywords,
      };
      onNext(data);
    },
    [selectedOption, selectedKeywords, onNext]
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
    <div className={styles.keywordselectContainer}>
      <div className={styles.listWrapper}>
        <div className={styles.title}>버튼을 눌러 각 키워드를 확인하세요!</div>
        <div className={styles.keywordSelector}>
          <div className={styles.buttonOptions}>
            {Object.keys(keywordOptions).map((option) => (
              <button
                key={option}
                onClick={() => setSelectedOption(option)}
                className={
                  selectedOption === option
                    ? styles.activeButton
                    : styles.normalButton
                }
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {selectedOption && keywordOptions[selectedOption] ? (
          <div className={styles.keywordList}>
            <div className={styles.keywordListSpan}>
              해당하는 키워드를 선택해주세요!
            </div>
            <ul>
              {keywordOptions[selectedOption].map((keyword) => (
                <li
                  key={keyword.pk}
                  onClick={() => handleKeywordSelect(keyword)}
                  className={
                    selectedKeywords.includes(keyword)
                      ? styles.selectedKeyword
                      : ""
                  }
                >
                  {keyword.description}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div></div>
        )}
        <div className={styles.selectedOptionDiv}>
          {selectedKeywords.length > 0 && (
            <div className={styles.clearButton} onClick={handleClearSelection}>
              <AiFillCloseCircle />
            </div>
          )}
          <ul>
            {selectedKeywords.map((keyword) => (
              <li
                key={keyword.pk}
                className={styles.selectedKeywordItem}
                onClick={() => handleSelectedKeywordRemove(keyword)}
              >
                {keyword.description}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.buttonWrapper}>
        <button className={styles.buttonStyle} onClick={handlePrev}>
          <span className={styles.buttonSpan}>BACK</span>
        </button>
        <button className={styles.buttonStyle} onClick={handleNext}>
          <span className={styles.buttonSpan}>NEXT</span>
        </button>
      </div>

      <div className={styles.bottom}>
        <div className={styles.bottomCarDiv}>
          <Car className={styles.bottomCar} />
        </div>
        <div className={styles.bottomBox}>
          <span className={styles.bottomText}>3단계</span>
          <span className={styles.bottomContinue}>
            {isModify ? "수정 중" : "작성 중"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Keywordselect;
