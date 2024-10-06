import React, { useState, useEffect } from "react"; // Don't forget to import useEffect
import styles from "./Address.module.css";
//import searchIcon from "./search-icon.png";

const Address = ({ areaName, address, setAddress, isAddress }) => {
  const [displayValue, setDisplayValue] = useState("");

  // 추가: 선택된 지역이 변경될 때마다 주소 입력 칸에 표시
  useEffect(() => {
    if (isAddress) {
      setDisplayValue(address);
    } else {
      const fullText = areaName.join(", ");

      setDisplayValue(fullText);
    }
  }, [areaName, address, isAddress]);

  const handleAddressChange = (e) => {
    if (isAddress) setAddress(e.target.value);
  };

  /*const handleSearch = () => {
    onAddressChange(address);
    setAddress("");
  }; */

  return (
    <div className={styles.addressContainer}>
      <div className={styles.searchContainer}>
        {isAddress ? (
          <input
            type="text"
            value={address}
            onChange={handleAddressChange}
            className={styles.addressInput}
            placeholder="주소를 입력하세요"
          />
        ) : (
          <input
            type="text"
            value={displayValue}
            onChange={() => {}}
            className={styles.addressInput}
            placeholder="아래 버튼에서 찾고 싶은 지역을 선택하세요"
          />
        )}
      </div>
    </div>
  );
};

export default Address;
