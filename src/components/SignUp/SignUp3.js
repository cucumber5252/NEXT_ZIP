import styles from "./SignUp3.module.css";
import { useState } from "react";

import mapImage from "../../assets/Search/Img.png";

export default function SignUp3({ onNext }) {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleButtonClick = (value) => {
    if (selectedOptions.includes(value)) {
      setSelectedOptions((prevSelected) =>
        prevSelected.filter((item) => item !== value)
      );
    } else {
      setSelectedOptions((prevSelected) => [...prevSelected, value]);
    }
  };

  const choices = {
    "Anam-Bub": "법학관후문",
    "Anam-Bomun": "보문",
    "Anam-Cham": "참살이길",
    "Anam-Intersect": "고대사거리",
    "Anam-Yongdu": "용두동",
    "Anam-Sungshin": "성신여대",
    "Anam-5way": "안암오거리",
    "Anam-Jegi": "제기동",
    "Anam-Gaeun": "개운사길",
  };
  const choicesArray = Object.entries(choices);

  const handleClick = () => {
    if (selectedOptions.length === 0) {
      alert("관심 있는 동네를 하나 이상 선택해주세요!");
    } else {
      onNext(selectedOptions);
    }
  };

  return (
    <div className={styles.signup3_div}>
      <div className={styles.content_container}>
        <div className={styles.title}>관심 동네 등록</div>
        <div className={styles.introduction}>
          평소 관심 있었던 동네를 1개 이상 선택해주세요
        </div>
        <img className={styles.mapImg} src={mapImage} alt="Map" />
        <div className={styles.buttonContainer}>
          {choicesArray.map(([key, value]) => (
            <button
              className={`${styles.button} ${
                selectedOptions.includes(key) ? styles.active : ""
              }`}
              key={key}
              onClick={() => handleButtonClick(key)}
            >
              {value}
            </button>
          ))}
        </div>
        <button onClick={handleClick} type="submit" className={styles.submit}>
          NEXT
        </button>
      </div>
    </div>
  );
}
