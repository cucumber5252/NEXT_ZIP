import React, { useState } from "react";
import styles from "./Search.module.css";
import Area from "../components/Search/Area.js";
import Price from "../components/Search/Price.js";
import Address from "../components/Search/Address.js";
import OneHouse from "../components/HouseList/OneHouse.js";
import { Link } from "react-router-dom";

const Search = ({ setSelectedHouse }) => {
  const [isAddress, setIsAddress] = useState(true); //검색 기능
  const [areaCode, setAreaCode] = useState([]); //used in Area to save selected area
  const [areaName, setAreaName] = useState([]); //holds Areaname
  const [priceQuery, setPriceQuery] = useState(null); //holds mlb, mub, dlb, dub used in Price
  const [address, setAddress] = useState("");
  const [rentType, setRentType] = useState(null);

  const [searchResult, setSearchResult] = useState({});
  const [searchResultIsAddress, setSearchResultIsAddress] = useState(true);

  const [validate, setValidate] = useState(false);

  const [buttons, setButtons] = useState([
    { code: "Anam-Sungshin", text: "성신여대", pressed: false },
    { code: "Anam-Bomun", text: "보문", pressed: false },
    { code: "Anam-5way", text: "안암오거리", pressed: false },
    { code: "Anam-Cham", text: "참살이길", pressed: false },
    { code: "Anam-Intersect", text: "고대사거리", pressed: false },
    { code: "Anam-Bub", text: "법학관후문", pressed: false },
    { code: "Anam-Yongdu", text: "용두동", pressed: false },
    { code: "Anam-Jegi", text: "제기동", pressed: false },
    { code: "Anam-Gaeun", text: "개운사길", pressed: false },
  ]);

  const handleClick = () => {
    let searchQuery;
    let searchType;
    if (
      (isAddress && address === "") ||
      (!isAddress && areaCode.length === 0)
    ) {
      searchType = "price";
      setSearchResultIsAddress(true);
      if (isAddress) {
        searchQuery = {
          ...priceQuery,
          rent_type: rentType,
          address: address,
        };
      } else {
        const areaCodeList = areaCode.join("_");
        searchQuery = { ...priceQuery, area: areaCodeList };
      }
    } else {
      if (isAddress === true) {
        searchType = "address";
        setSearchResultIsAddress(true);
        searchQuery = { ...priceQuery, address: address };
      } else {
        searchType = "area";
        setSearchResultIsAddress(false);
        const areaCodeList = areaCode.join("_");
        searchQuery = { ...priceQuery, area: areaCodeList };
      }
    }
    handleSearch(searchQuery, searchType);
    setValidate(false);
  };

  const handleSearch = (searchQuery, searchType) => {
    let apiUrl = "https://backend.kuzip.kr/api/search/";

    if (searchType === "address") {
      apiUrl += "address";
    } else if (searchType === "area") {
      apiUrl += "area";
    } else {
      apiUrl += "price";
    }

    const queryList = Object.keys(searchQuery)
      .map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(searchQuery[key])}`
      )
      .join("&");
    apiUrl = apiUrl + "/?" + queryList;

    const token = "542f1aa2ade490ef602b8ac7b0e789b24d374bec";
    // const token = localStorage.getItem("login-token");
    fetch(apiUrl, {
      headers: {
        Authorization: `Token ${token}`,
      },
      mode: "cors",
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => setSearchResult(data))
      .catch((error) => console.log(error));
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleClick();
    }
  };

  return (
    <div className={styles.divSize} onKeyDown={handleKeyDown}>
      <div className={styles.searchList}>
        <div className={styles.searchListPrice}>
          <div className={styles.priceSearch}>
            <span className={styles.divTitle}>가격으로 찾기</span>
            <Price
              priceQuery={priceQuery}
              setPriceQuery={setPriceQuery}
              validate={validate}
              setValidate={setValidate}
              rentType={rentType}
              setRentType={setRentType}
            />
          </div>
        </div>
        <div className={styles.searchListAddressArea}>
          <div className={styles.divTitle}>
            {isAddress === true ? (
              <span>주소로 찾기</span>
            ) : (
              <span>동네로 찾기</span>
            )}
          </div>
          <div className={styles.addressSearch}>
            <Address
              areaName={areaName}
              address={address}
              setAddress={setAddress}
              isAddress={isAddress}
            />
          </div>
          <div className={styles.areaSearch}>
            <Area
              setAreaCode={setAreaCode}
              setAreaName={setAreaName}
              setIsAddress={setIsAddress}
              buttons={buttons}
              setButtons={setButtons}
            />
          </div>
        </div>
        <button className={styles["search-button"]} onClick={handleClick}>
          검색
        </button>
        <div className={styles.searchResultList}>
          {searchResult.message === "no search result" ? (
            <div className={styles.searchResultError}>검색 결과가 없습니다</div>
          ) : searchResultIsAddress ? (
            searchResult.length > 0 && (
              <div className={styles.houseList}>
                <div className={styles.searchResultListTitle}>검색 결과</div>
                {searchResult.map((house, index) => (
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
            )
          ) : (
            Object.keys(searchResult).length > 0 && (
              <div className={styles.houseList}>
                {Object.keys(searchResult).map((key) => (
                  <div key={key}>
                    <div className={styles.searchResultListTitle}>{key}</div>
                    {Array.isArray(searchResult[key]) &&
                      searchResult[key].map((house, index) => (
                        <Link to="/detail" key={index}>
                          <span
                            className={styles.oneHouseMargin}
                            onClick={() => setSelectedHouse(house)}
                            key={index}
                          >
                            <OneHouse house={house}></OneHouse>
                          </span>
                        </Link>
                      ))}
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
