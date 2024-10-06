import styles from "./HouseList.module.css";
import OneHouse from "../components/HouseList/OneHouse.js";
import React, { useState, useEffect } from "react";
import { ReactComponent as CheckedImg } from "../assets/Main/checkedImg.svg";
import { Link } from "react-router-dom";

function HouseList({
  houseData,
  setSelectedHouse,
  activeAreas,
  selectedAreaCodes,
}) {
  const [checked, setChecked] = useState(false);
  const [goodHouses, setGoodHouses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const filteredHouses = houseData.filter(
      (house) => house.suggest_ratio >= 0.5
    );
    setGoodHouses(filteredHouses);
  }, [checked, houseData]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeAreas, selectedAreaCodes]);

  const handleCheckboxClick = () => {
    setChecked((prevChecked) => !prevChecked);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentHouses = checked
    ? goodHouses.slice(indexOfFirstItem, indexOfLastItem)
    : houseData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(
    (checked ? goodHouses.length : houseData.length) / itemsPerPage
  );

  return (
    <div className={styles.div}>
      <div className={styles.checkBox}>
        <div className={styles.checkBoxDiv} onClick={handleCheckboxClick}>
          <div className={styles.checkBoxRectangle}>
            {checked && <CheckedImg className={styles.checked} />}
          </div>
          <span className={styles.checkBoxText}>추천 비율 높은 집만 보기</span>
        </div>
      </div>

      <div className={styles.houseList}>
        {currentHouses.map((house, index) => (
          <Link to="/detail" key={index}>
            <span
              className={styles.oneHouseMargin}
              onClick={() => setSelectedHouse(house)}
            >
              <OneHouse house={house}></OneHouse>
            </span>
          </Link>
        ))}
      </div>

      <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={currentPage === index + 1 ? styles.activePage : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default HouseList;
