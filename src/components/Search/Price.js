import React, { useState, useEffect, useCallback } from "react";
import styles from "./Price.module.css";

const Price = ({
  priceQuery,
  setPriceQuery,
  validate,
  setValidate,
  rentType,
  setRentType,
}) => {
  const [showInputFields, setShowInputFields] = useState(false);
  const [minDeposit, setMinDeposit] = useState("");
  const [maxDeposit, setMaxDeposit] = useState("");
  const [minMonthlyRent, setMinMonthlyRent] = useState("");
  const [maxMonthlyRent, setMaxMonthlyRent] = useState("");

  const formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleInputChange = (e, setValueFunction) => {
    const rawValue = e.target.value.replace(/,/g, "");
    if (/^\d*$/.test(rawValue)) {
      setValueFunction(rawValue);
    }
  };

  // 백엔드로 쿼리를 보내는 함수
  const sendQueryToBackend = useCallback(() => {
    let query_dict = {};
    if (!validate) return;
    if (rentType === "monthly") {
      // 월세인 경우에 대한 쿼리 생성
      if (
        (minDeposit === "" ||
          parseInt(minDeposit) <= parseInt(maxDeposit) ||
          maxDeposit === "") &&
        (minMonthlyRent === "" ||
          parseInt(minMonthlyRent) <= parseInt(maxMonthlyRent) ||
          maxMonthlyRent === "")
      ) {
        query_dict["rent_type"] = rentType;

        if (minMonthlyRent !== "") query_dict["mlb"] = minMonthlyRent;
        if (maxMonthlyRent !== "") query_dict["mub"] = maxMonthlyRent;
        if (minDeposit !== "") query_dict["dlb"] = minDeposit;
        if (maxDeposit !== "") query_dict["dub"] = maxDeposit;
        setPriceQuery((prev) => ({
          ...prev,
          ...query_dict,
          rent_type: "monthly",
        }));
        // onPriceQuery를 호출하여 Price Query를 App 컴포넌트로 전달
      } else {
        setValidate(false);
        alert("최솟값과 최댓값을 올바르게 입력하세요.");
      }
    } else if (rentType === "jeon") {
      // 전세인 경우에 대한 쿼리 생성
      if (
        minDeposit === "" ||
        parseInt(minDeposit) <= parseInt(maxDeposit) ||
        maxDeposit === ""
      ) {
        query_dict["rent_type"] = rentType;
        if (minDeposit !== "") query_dict["dlb"] = minDeposit;
        if (maxDeposit !== "") query_dict["dub"] = maxDeposit;
        setPriceQuery((prev) => ({
          ...prev,
          ...query_dict,
        }));
      } else {
        alert("최솟값과 최댓값을 올바르게 입력하세요.");
      }
    } else {
      setValidate(false);
      alert("거래 유형을 선택하세요."); // rentType이 선택되지 않은 경우 경고 메시지
    }
  }, [
    rentType,
    minDeposit,
    maxDeposit,
    minMonthlyRent,
    maxMonthlyRent,
    validate,
    setPriceQuery,
    setValidate,
  ]);

  const handleRentTypeClick = (type) => {
    if (rentType === type) {
      // 이미 선택된 버튼을 다시 클릭하면 초기화
      setRentType(null);
      setShowInputFields(false); // 입력 칸 숨김
    } else {
      setRentType(type);
      setShowInputFields(true); // 입력 칸 보이기
    }
  };

  useEffect(() => {
    if (validate) {
      sendQueryToBackend();
    }
  }, [validate, sendQueryToBackend]);

  return (
    <div>
      <div className={styles.priceButtonsContainer}>
        {/* 월세 버튼 */}
        <button
          className={`${styles.priceButton} ${
            rentType === "monthly" ? styles.active : ""
          }`}
          onClick={() => handleRentTypeClick("monthly")}
        >
          월세
        </button>

        {/* 전세 버튼 */}
        <button
          className={`${styles.priceButton} ${
            rentType === "jeon" ? styles.active : ""
          }`}
          onClick={() => handleRentTypeClick("jeon")}
        >
          전세
        </button>
      </div>

      {showInputFields && (
        <div className={styles.priceInputGroup}>
          <div className={styles.priceInputDiv}>
            <label className={styles.priceInputLabel}>
              {rentType === "monthly" ? "보증금" : "전세금"}
            </label>
            <div className={styles.priceInputRange}>
              <input
                type="text"
                className={styles.priceInput}
                value={formatNumberWithCommas(minDeposit)}
                onChange={(e) => handleInputChange(e, setMinDeposit)}
                // placeholder={`최소 ${
                //   rentType === "monthly" ? "보증금" : "전세금"
                // }`}
                placeholder="만원 단위"
              />
              <span className={styles.waveText}>~</span>
              <input
                type="text"
                className={styles.priceInput}
                value={formatNumberWithCommas(maxDeposit)}
                onChange={(e) => handleInputChange(e, setMaxDeposit)}
                // placeholder={`최대 ${
                //   rentType === "monthly" ? "보증금" : "전세금"
                // }`}
                placeholder="만원 단위"
              />
            </div>
          </div>

          {/* 추가된 코드: 월세 입력 칸 */}
          {rentType === "monthly" && (
            <div className={styles.priceInputDiv}>
              <label className={styles.priceInputLabel}>월세</label>
              <div className={styles.priceInputRange}>
                <input
                  type="text"
                  className={styles.priceInput}
                  value={formatNumberWithCommas(minMonthlyRent)}
                  onChange={(e) => handleInputChange(e, setMinMonthlyRent)}
                  placeholder="만원 단위"
                />
                <span className={styles.waveText}>~</span>
                <input
                  type="text"
                  className={styles.priceInput}
                  value={formatNumberWithCommas(maxMonthlyRent)}
                  onChange={(e) => handleInputChange(e, setMaxMonthlyRent)}
                  placeholder="만원 단위"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Price;
