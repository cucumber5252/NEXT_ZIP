import React, { useState, useEffect, useCallback } from "react";
import styles from "./FirstForm.module.css";
import mapImage from "../../assets/Search/Img.png";
import { ReactComponent as Car } from "../../assets/Write/Car.svg";
import { ReactComponent as SearchImg } from "../../assets/Main/searchImg.svg";

import ModalBasic from "./ModalBasic";

const FirstForm = ({ onNext, FirstData, isModify }) => {
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [area, setArea] = useState("");
  const [residenceType, setResidenceType] = useState("");
  const [popup, setPopup] = useState(false);
  // const [alertMessage, setAlertMessage] = useState(null);

  useEffect(() => {
    if (FirstData) {
      setAddress(FirstData.address);
      setName(FirstData.name);
      setArea(FirstData.area);
      setResidenceType(FirstData.residenceType);
    }
  }, [FirstData]);

  const handleNext = useCallback(
    (e) => {
      e.preventDefault();

      // if (!address) {
      //   alert("주소를 입력해주세요!");
      //   return;
      // } else if (!name) {
      //   alert("집 이름 입력해주세요!");
      //   return;
      // } else if (!area) {
      //   alert("동네를 선택해주세요!");
      //   return;
      // } else if (!residenceType) {
      //   alert("집 유형을 입력해주세요!");
      //   return;
      // }

      const formData = {
        address,
        name,
        area,
        residenceType,
      };
      onNext(formData);
    },
    [address, name, area, residenceType, onNext]
  );

  const onClose = () => {
    setPopup(false);
  };

  const onPopup = (e) => {
    e.preventDefault();
    setPopup(true);
  };

  const onReturnValue = (data) => {
    setAddress(data);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (popup === false && event.key === "Enter") {
        event.preventDefault();
        handleNext(event);
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [popup, handleNext]);

  return (
    <div className={styles.firstFormDiv}>
      <form className={styles.formContainer} onSubmit={handleNext}>
        <div className={styles.label}>
          <div className={styles.labelTitle}>주소</div>
          <span className={styles.inputSpan}>
            <input
              type="text"
              value={address}
              placeholder="아이콘을 눌러 주소를 입력해주세요!"
              onChange={handleAddressChange}
              className={styles.input}
              readOnly
              onClick={() => {
                if (isModify) {
                  alert(
                    "주소는 수정이 불가해요. 다른 집 리뷰를 작성하고 싶다면 새로운 리뷰를 작성해보세요!"
                  );
                }
              }}
            />
            <button
              className={styles.addressButton}
              onClick={onPopup}
              disabled={isModify}
            >
              <SearchImg className={styles.searchImg} />
            </button>
          </span>
        </div>

        <div className={styles.label}>
          <div className={styles.labelTitle}>집 이름</div>
          <span className={styles.inputSpan}>
            <input
              type="text"
              value={name}
              placeholder="건물이름을 입력해주세요! ex) 청암빌딩"
              onChange={(e) => setName(e.target.value)}
              className={styles.input}
            />
          </span>
        </div>

        <div className={styles.label}>
          <div className={styles.labelTownDiv}>
            <span className={styles.labelTown}>동네</span>
            <span className={styles.labelTownButton}>
              동네 보기
              <div className={styles.labelTownImgPopup}>
                <img
                  className={styles.labelTownImg}
                  src={mapImage}
                  alt="Area"
                />
              </div>
            </span>
          </div>

          <select
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className={styles.select}
          >
            <option disabled value="" className={styles.option}>
              어느 동네에 거주하셨나요?
            </option>
            <option value="Anam-Gaeun" className={styles.option}>
              개운사길
            </option>
            <option value="Anam-Bub" className={styles.option}>
              법학관후문
            </option>
            <option value="Anam-Cham" className={styles.option}>
              참살이길
            </option>
            <option value="Anam-Yongdu" className={styles.option}>
              용두동
            </option>
            <option value="Anam-Sungshin" className={styles.option}>
              성신여대
            </option>
            <option value="Anam-Jegi" className={styles.option}>
              제기동
            </option>
            <option value="Anam-Bomun" className={styles.option}>
              보문
            </option>
            <option value="Anam-5way" className={styles.option}>
              안암오거리
            </option>
            <option value="Anam-Intersect" className={styles.option}>
              고대사거리
            </option>
          </select>
        </div>

        <div className={styles.label}>
          <div className={styles.labelTitle}>거주 유형</div>
          <select
            value={residenceType}
            onChange={(e) => setResidenceType(e.target.value)}
            className={styles.select}
          >
            <option disabled value="" className={styles.option}>
              해당 집은 어떤 유형이었나요?
            </option>
            <option value="OpenOneRoom" className={styles.option}>
              오픈형 원룸
            </option>
            <option value="SepOneRoom" className={styles.option}>
              분리형 원룸
            </option>
            <option value="Duplex" className={styles.option}>
              복층형 원룸
            </option>
            <option value="TwoRoom" className={styles.option}>
              투룸
            </option>
            <option value="OfficeTel" className={styles.option}>
              오피스텔
            </option>
          </select>
        </div>

        <div className={styles.buttonWrapper}>
          <button className={styles.buttonStyle} type="submit">
            <span className={styles.buttonSpan}>NEXT</span>
          </button>
        </div>
        <div className={styles.bottom}>
          <div className={styles.bottomCarDiv}>
            <Car className={styles.bottomCar} />
          </div>
          <div className={styles.bottomBox}>
            <span className={styles.bottomText}>1단계</span>
            <span className={styles.bottomContinue}>
              {isModify ? "수정 중" : "작성 중"}
            </span>
          </div>
        </div>
      </form>

      {popup && (
        <div className={styles.modalContainer}>
          <div className={styles.modal}>
            <ModalBasic
              setModalOpen={onClose}
              onClose={onClose}
              onReturnValue={onReturnValue}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FirstForm;
