import React, { useState } from "react";
import styles from "./TownModal.module.css";
import Img from "../../assets/Search/Img.png";

function TownModal({
  selectedAreaCodes,
  setSelectedAreaCodes,
  fetchData,
  townUrl,
  setTownHouseData,
}) {
  const token = "542f1aa2ade490ef602b8ac7b0e789b24d374bec";
  // const token = localStorage.getItem("login-token");

  async function PostInterestArea(selected) {
    try {
      const response = await fetch(
        "https://backend.kuzip.kr/api/user-interest/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({
            area_code: selected,
          }),
          mode: "cors",
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const initialButtons = [
    { code: "Anam-Sungshin", text: "성신여대", pressed: false },
    { code: "Anam-Bomun", text: "보문", pressed: false },
    { code: "Anam-5way", text: "안암오거리", pressed: false },
    { code: "Anam-Cham", text: "참살이길", pressed: false },
    { code: "Anam-Intersect", text: "고대사거리", pressed: false },
    { code: "Anam-Bub", text: "법학관후문", pressed: false },
    { code: "Anam-Yongdu", text: "용두동", pressed: false },
    { code: "Anam-Jegi", text: "제기동", pressed: false },
    { code: "Anam-Gaeun", text: "개운사길", pressed: false },
  ];

  const updatedInitialButtons = initialButtons.map((button) => {
    const isPressed = selectedAreaCodes.some(
      (area) => area.area_code === button.code
    );
    return {
      code: button.code,
      text: button.text,
      pressed: isPressed,
    };
  });

  const [buttons, setButtons] = useState(updatedInitialButtons);

  const [showMapAndButtons, setShowMapAndButtons] = useState(false);

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
  };

  const handleShowMapAndButtons = () => {
    setShowMapAndButtons((prevShowMapAndButtons) => !prevShowMapAndButtons);
  };

  const onSave = () => {
    const selected = buttons
      .filter((button) => button.pressed)
      .map((button) => ({ area_code: button.code, area_name: button.text }));

    PostInterestArea(selected.map((item) => item.area_code));
    setSelectedAreaCodes(selected);
    fetchData(townUrl, setTownHouseData);
    handleShowMapAndButtons();
  };

  return (
    <div>
      <div className={styles.showMapButtonContainer}>
        <button
          className={`${styles.showMapButton} ${
            showMapAndButtons ? styles.showMapButtonClicked : ""
          }`}
          onClick={handleShowMapAndButtons}
        >
          관심 동네 변경하기
        </button>
      </div>

      {showMapAndButtons && (
        <div className={styles.modalContainer}>
          <div className={styles.modalContent}>
            <button
              className={styles.closeButton}
              onClick={handleShowMapAndButtons}
            >
              ✕
            </button>

            <div className={styles.MapAndButtonsContainer}>
              <div className={styles.mapTitleSpan}>관심 동네 변경하기</div>
              <img className={styles.Map} src={Img} alt="Map" />
              <div className={styles.areaButtonDiv}>
                {buttons.map((button) => (
                  <button
                    key={button.code}
                    className={`${styles.areaButton} ${
                      button.pressed ? styles.pressed : ""
                    }`}
                    onClick={(e) => handleButtonClick(button.code, button.text)}
                  >
                    {button.text}
                  </button>
                ))}
              </div>
            </div>
            <button className={styles.submitButtonPressed} onClick={onSave}>
              <span className={styles.submitButtonSpan}>저장하기</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TownModal;
