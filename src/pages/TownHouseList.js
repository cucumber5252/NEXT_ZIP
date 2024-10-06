import styles from "./TownHouseList.module.css";
import HouseList from "./HouseList.js";
import TownModal from "../components/Town/TownModal.js";
import { useState, useEffect } from "react";

function TownHouseList({
  houseData,
  setSelectedHouse,
  selectedAreaCodes,
  setSelectedAreaCodes,
  fetchData,
  townUrl,
  setTownHouseData,
  token,
}) {
  const [activeAreas, setActiveAreas] = useState([]);
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    const apiUrl =
      "https://backend.kuzip.kr/api/user-interest/area/?simple=True";

    fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Token ${token}`,
      },
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        setSelectedAreaCodes(data);
      })
      .catch((error) => console.log(error));
  }, [setSelectedAreaCodes, token]);

  useEffect(() => {
    const codeToTextList = [
      { code: "Anam-Sungshin", text: "성신여대" },
      { code: "Anam-Bomun", text: "보문" },
      { code: "Anam-5way", text: "안암오거리" },
      { code: "Anam-Cham", text: "참살이길" },
      { code: "Anam-Intersect", text: "고대사거리" },
      { code: "Anam-Bub", text: "법학관후문" },
      { code: "Anam-Yongdu", text: "용두동" },
      { code: "Anam-Jegi", text: "제기동" },
      { code: "Anam-Gaeun", text: "개운사길" },
    ];

    const textToCode = (text) => {
      const found = codeToTextList.find((button) => button.text === text);
      return found ? found.code : text;
    };

    // const codeToText = (code) => {
    //   const found = codeToTextList.find((button) => button.code === code);
    //   return found ? found.text : code;
    // };

    if (activeAreas.length > 0) {
      const filteredHouses = houseData.filter((house) =>
        activeAreas.includes(textToCode(house.area_name))
      );
      setHouses(filteredHouses);
    } else {
      setHouses(houseData);
    }
  }, [activeAreas, houseData]);

  return (
    <div className={styles.townHouseListDiv}>
      <div className={styles.townModalLabel}>
        <TownModal
          selectedAreaCodes={selectedAreaCodes}
          setSelectedAreaCodes={setSelectedAreaCodes}
          fetchData={fetchData}
          townUrl={townUrl}
          setTownHouseData={setTownHouseData}
        />
      </div>
      <div className={styles.townButtons}>
        <div className={styles.townButtonsFlex}>
          {selectedAreaCodes.map((area, index) => (
            <button
              key={index}
              className={`${styles.townButton} ${
                activeAreas.includes(area.area_code) ? styles.activeArea : ""
              }`}
              onClick={() =>
                setActiveAreas((prevActiveAreas) =>
                  prevActiveAreas.includes(area.area_code)
                    ? prevActiveAreas.filter((item) => item !== area.area_code)
                    : [...prevActiveAreas, area.area_code]
                )
              }
            >
              {area.area_name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <HouseList
          houseData={houses}
          setSelectedHouse={setSelectedHouse}
          activeAreas={activeAreas}
          selectedAreaCodes={selectedAreaCodes}
        />
      </div>
    </div>
  );
}

export default TownHouseList;
