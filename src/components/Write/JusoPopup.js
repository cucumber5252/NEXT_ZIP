// JusoPopup.js
import React, { useState } from "react";
import $ from "jquery";
import styles from "./JusoPopup.module.css";
import { useEffect } from "react";

const JusoPopup = ({ onClose, onReturnValue }) => {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([]);

  function checkSearchedWord(obj) {
    if (obj.length > 0) {
      // 특수문자 제거

      var expText = /[%=><]/;

      if (expText.test(obj) === true) {
        alert("특수문자를 입력 할수 없습니다.");

        obj = obj.split(expText).join("");

        return false;
      }

      // 특정문자열(sql예약어의 앞뒤공백포함) 제거

      var sqlArray = [
        "OR",
        "SELECT",
        "INSERT",
        "DELETE",
        "UPDATE",
        "CREATE",
        "DROP",
        "EXEC",
        "UNION",
        "FETCH",
        "DECLARE",
        "TRUNCATE",
      ];

      // sql 예약어

      var regex = "";

      for (var num = 0; num < sqlArray.length; num++) {
        regex = new RegExp(sqlArray[num], "gi");

        if (regex.test(obj.value)) {
          alert(
            '"' + sqlArray[num] + '"와(과) 같은 특정문자로 검색할 수 없습니다.'
          );

          obj.value = obj.value.replace(regex, "");

          return false;
        }
      }
    } else {
      alert("주소를 입력해주세요!");
      return false;
    }
    return true;
  }

  function getAddr() {
    setResults([]);
    // 적용예 (api 호출 전에 검색어 체크)
    if (!checkSearchedWord(keyword)) {
      return;
    }

    $.ajax({
      url: "https://business.juso.go.kr/addrlink/addrLinkApi.do",

      type: "",

      data: {
        confmKey: "	devU01TX0FVVEgyMDIzMDgwMzE3NDQ0NzExMzk4ODc=",

        currentPage: 1,

        countPerPage: 10000,

        keyword: keyword,

        resultType: "json",
      },

      dataType: "jsonp",

      crossDomain: true,

      success: function (jsonStr) {
        if (jsonStr.results && jsonStr.results.juso) {
          setResults(jsonStr.results.juso);
        } else {
          setResults([]);
        }
      },
      error: function (xhr, status, error) {
        alert("에러발생");
      },
    });
  }

  const handleInputChange = (e) => {
    setKeyword(e.target.value);
  };

  // const handleReturnClick = () => {
  //   onClose();
  // };

  const handleJusoClick = (result) => {
    onReturnValue(result.roadAddr);
    onClose();
  };

  const handleJusoKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      getAddr();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleJusoKeyPress);
    return () => {
      window.removeEventListener("keydown", handleJusoKeyPress);
    };
    // eslint-disable-next-line
  }, [keyword]);

  return (
    <div className={styles.popupContainer}>
      <input
        type="text"
        value={keyword}
        onChange={handleInputChange}
        placeholder="도로명주소, 건물명 또는 지번 입력"
        className={styles.inputField}
      />
      <div className={styles.searchButton}>
        <button onClick={getAddr} className={styles.searchBtn}>
          검색
        </button>
      </div>

      <div className={styles.resultsContainer}>
        <ul className={styles.resultsList}>
          {results.map((result, index) => (
            <li
              key={`${result.zipNo}-${index}`}
              className={styles.resultItem}
              onClick={() => {
                handleJusoClick(result);
              }}
            >
              <div className={styles.contentWrapper}>{result.roadAddr}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default JusoPopup;
