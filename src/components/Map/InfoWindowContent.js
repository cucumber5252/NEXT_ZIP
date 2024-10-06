import React, { useState } from "react";
import styles from "./infoWindowContent.module.css";
import { useEffect } from "react";

import ReviewAreaTitle from "../../components/ReviewList/ReviewAreaTitle.js";
import RatioBar from "../../components/ReviewList/RatioBar.js";

import { ReactComponent as GoodButtonImg } from "../../assets/Main/goodButtonImg.svg";
import { ReactComponent as BadButtonImg } from "../../assets/Main/badButtonImg.svg";

const InfoWindowContent = ({ house }) => {
  const [imgIndex, setImgIndex] = useState(0);

  const prevImage = (e) => {
    e.stopPropagation();
    if (imgIndex >= 0) {
      setImgIndex(imgIndex - 1);
    } else {
      setImgIndex(house.img_urls.length - 1);
    }
  };

  useEffect(() => {
    console.log("imgIndex", imgIndex);
  }, [imgIndex]);

  const nextImage = (e) => {
    e.stopPropagation();
    console.log("next");
    if (imgIndex < house.img_urls.length - 1) {
      setImgIndex(imgIndex + 1);
    } else {
      setImgIndex(0);
    }
  };

  const likeWidth = "50%";
  const dislikeWidth = "50%";

  return (
    <div className={styles.infoWindowClass}>
      <div>
        <b>{house.name}</b>
      </div>
      <br />

      <div className={styles.imgDiv}>
        <button onClick={prevImage} className={styles.Icon}>
          &lt;
        </button>
        <img
          src={house.img_urls[imgIndex]}
          className={styles.ExamplePicture}
          alt={house.img_urls}
        />
        <button onClick={nextImage} className={styles.Icon}>
          &gt;
        </button>
      </div>
      <br />
    </div>
  );
};

export default InfoWindowContent;
