import React, { useState, useEffect, useCallback } from "react";
import styles from "./SecondForm.module.css";
import PriceInput from "./PriceInput.js";
import { ReactComponent as Car } from "../../assets/Write/Car.svg";

function generateYearOptions(startYear, endYear) {
  const yearOptions = [];
  for (let year = endYear; year >= startYear; year--) {
    const numericYear = parseInt(year, 10); // 숫자로 변환
    yearOptions.push(
      <option key={numericYear} value={numericYear} className={styles.option}>
        {numericYear}년
      </option>
    );
  }
  return yearOptions;
}

function SecondForm({ onNext, onPrev, SecondData, isModify }) {
  const [rentType, setRentType] = useState("");
  const [deposit, setDeposit] = useState("");
  const [monthlyRent, setMonthlyRent] = useState("");
  const [maintenance, setMaintenance] = useState("");
  const [floor, setFloor] = useState("");
  const [moveOutYear, setMoveOutYear] = useState("");

  const handleNext = useCallback(
    (e) => {
      e.preventDefault();

      // if (!floor) {
      //   alert("거주 층수를 입력해주세요!");
      //   return;
      // } else if (!moveOutYear) {
      //   alert("퇴실연도를 입력해주세요!");
      //   return;
      // } else if (!rentType) {
      //   alert("계약 유형을 선택해주세요!");
      //   return;
      // } else if (!deposit) {
      //   if (rentType === "jeon") {
      //     alert("전세금을 입력해주세요!");
      //     return;
      //   } else if (rentType === "monthly") {
      //     alert("보증금을 입력해주세요!");
      //     return;
      //   }
      // } else if (rentType === "monthly" && !monthlyRent) {
      //   alert("월세를 입력해주세요!");
      //   return;
      // } else if (!maintenance) {
      //   alert("관리비 입력해주세요!");
      //   return;
      // }
      const formData = {
        rentType,
        deposit,
        monthlyRent,
        maintenance,
        floor,
        moveOutYear,
      };
      onNext(formData);
    },
    [rentType, deposit, monthlyRent, maintenance, floor, moveOutYear, onNext]
  );

  const handlePrev = () => {
    onPrev();
  };

  useEffect(() => {
    if (SecondData) {
      setRentType(SecondData.rentType);
      setDeposit(SecondData.deposit);
      setMonthlyRent(SecondData.monthlyRent);
      setMaintenance(SecondData.maintenance);
      setFloor(SecondData.floor);
      setMoveOutYear(SecondData.moveOutYear);
    }
  }, [SecondData]);

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
    <div className={styles.formDiv}>
      <form className={styles.formContainer} onSubmit={handleNext}>
        <div className={styles.fomContainerDiv}>
          <div className={styles.label}>
            <div className={styles.labelTitle}>거주 층수</div>
            <select
              value={floor}
              onChange={(e) => setFloor(e.target.value)}
              className={styles.select}
            >
              <option disabled value="" className={styles.option}>
                저층, 중층, 상층 중 선택하세요!
              </option>
              <option value="UP" className={styles.option}>
                상
              </option>
              <option value="MID" className={styles.option}>
                중
              </option>
              <option value="LOW" className={styles.option}>
                하
              </option>
            </select>
          </div>
          <div className={styles.label}>
            <div className={styles.labelTitle}>퇴실연도</div>
            <select
              value={moveOutYear}
              onChange={(e) => setMoveOutYear(parseInt(e.target.value, 10))}
              className={styles.select}
            >
              <option disabled value="" className={styles.option}>
                퇴실한 연도를 선택해주세요!
              </option>
              {generateYearOptions(2015, 2023)}
            </select>
          </div>
          <div className={styles.label}>
            <div className={styles.labelTitle}>계약 유형</div>
            <select
              value={rentType}
              onChange={(e) => setRentType(e.target.value)}
              className={styles.select}
            >
              <option disabled value="" className={styles.option}>
                월세, 전세 중 선택해주세요!
              </option>
              <option value="monthly" className={styles.option}>
                월세
              </option>
              <option value="jeon" className={styles.option}>
                전세
              </option>
            </select>
          </div>
          <PriceInput
            rentType={rentType}
            deposit={deposit}
            setDeposit={setDeposit}
            monthlyRent={monthlyRent}
            setMonthlyRent={setMonthlyRent}
            maintenance={maintenance}
            setMaintenance={setMaintenance}
          />
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
            <span className={styles.bottomText}>2단계</span>
            <span className={styles.bottomContinue}>
              {isModify ? "수정 중" : "작성 중"}
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SecondForm;
