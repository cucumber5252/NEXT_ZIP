import React, { useState } from "react";
import styles from "./Area.module.css";
import Img from "../../assets/Search/Img.png";

function Area({ setAreaCode, setAreaName, setIsAddress, buttons, setButtons }) {
  // area는 code, selectedArea는 text
  const [showMapAndButtons, setShowMapAndButtons] = useState(false);

  // const updateButton = (code) => {
  //   const updatedButtons = buttons.map((button) => {
  //     return button.code === code
  //       ? { ...button, pressed: !button.pressed }
  //       : { ...button };
  //   });
  //   setButtons(updatedButtons);

  //   console.log("updatd buttons", buttons);
  // };

  const handleButtonClick = (code, text) => {
    const buttonIndex = buttons.findIndex((button) => button.code === code);
    const updatedButtons = buttons.map((button, index) => {
      if (index === buttonIndex) {
        return { ...button, pressed: !button.pressed };
      } else {
        return { ...button };
      }
    });

    setButtons(updatedButtons);

    if (buttons[buttonIndex].pressed) {
      setAreaCode((prev) => prev.filter((item) => item !== code));
      setAreaName((prev) => prev.filter((item) => item !== text));
    } else {
      setAreaCode((prev) => [...prev, code]);
      setAreaName((prev) => [...prev, text]);
    }
  };

  const handleShowMapAndButtons = () => {
    setIsAddress((prev) => !prev);
    setShowMapAndButtons((prevShowMapAndButtons) => !prevShowMapAndButtons);
  };

  return (
    <div>
      {/* "정확한 주소를 모르시는 경우" 버튼 */}
      <div className={styles.showMapButtonContainer}>
        <button
          className={`${styles.showMapButton} ${
            showMapAndButtons ? styles.showMapButtonClicked : ""
          }`}
          onClick={handleShowMapAndButtons}
        >
          정확한 주소를 모르겠다면?
        </button>
      </div>

      <div className={styles.MapAndButtonsContainer}>
        {/* 조건부 렌더링을 사용하여 지도와 버튼들을 렌더링 */}
        {showMapAndButtons && (
          <>
            {/* 지도 렌더링 */}
            {/* <span className={styles.mapText}>
              * 원하는 지역을 선택해주세요{" "}
            </span> */}
            <img className={styles.Map} src={Img} alt="Map" />

            <div className={styles.areaButtonDiv}>
              {buttons.map((button) => (
                <button
                  key={button.code}
                  className={`${styles.areaButton} ${
                    button.pressed ? styles.pressed : ""
                  }`}
                  onClick={() => handleButtonClick(button.code, button.text)}
                >
                  {button.pressed ? `${button.text}` : button.text}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Area;
