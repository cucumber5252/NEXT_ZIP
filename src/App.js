import Nav from "./components/Nav/Nav.js";
import styles from "./App.module.css";
import Map from "./components/Map/Map.js";
import PrivateRoute from "./PrivateRoute.js";

import ReviewList from "./pages/ReviewList.js";
import HouseList from "./pages/HouseList.js";
import TownHouseList from "./pages/TownHouseList.js";
import Write from "./pages/Write.js";
import Modify from "./pages/Modify.js";
import Search from "./pages/Search.js";
import Profile from "./pages/Profile.js";
import Landing from "./pages/Landing.js";
import Login from "./pages/Login.js";
import Logout from "./pages/Logout.js";
import Signup from "./pages/SignUp.js";
import FindId from "./pages/FindId.js";
import FindPw from "./pages/FindPw.js";
import ResetPw from "./pages/ResetPw.js";
import Signup2 from "./components/SignUp/SignUp2.js";
import Signup3 from "./components/SignUp/SignUp3.js";
import Signup4 from "./components/SignUp/SignUp4.js";
import EmailVerify from "./pages/EmailVerify.js";

import { Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const App = () => {
  const [houseData, setHouseData] = useState([]);
  const [likeHouseData, setLikeHouseData] = useState([]);
  const [townHouseData, setTownHouseData] = useState([]);
  const [mapInitial, setMapInitial] = useState(false);
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [selectedAreaCodes, setSelectedAreaCodes] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //데이터 가져오기 Case2
  const token = "542f1aa2ade490ef602b8ac7b0e789b24d374bec";

  // const token = localStorage.getItem("login-token");

  const basicUrl = "https://backend.kuzip.kr/api/houses/?simple";
  const likeUrl = "https://backend.kuzip.kr/api/user-interest/house";
  const townUrl = "https://backend.kuzip.kr/api/user-interest/area";

  async function fetchData(api, setData) {
    try {
      const response = await fetch(api, {
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
        mode: "cors",
      });

      const data = await response.json();
      // console.log(data);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    console.log("일반 데이터", houseData);
  }, [houseData]);
  useEffect(() => {
    console.log("찜 데이터", likeHouseData);
  }, [likeHouseData]);
  useEffect(() => {
    console.log("동네 데이터", townHouseData);
  }, [townHouseData]);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/home") {
      fetchData(basicUrl, setHouseData);
    } else if (location.pathname === "/profile") {
      fetchData(likeUrl, setLikeHouseData);
    } else if (location.pathname === "/town" && !selectedAreaCodes.length) {
      fetchData(townUrl, setTownHouseData);
    }
  }, [location, selectedAreaCodes.length]);

  useEffect(() => {
    if (selectedAreaCodes.length) {
      fetchData(townUrl, setTownHouseData);
    }
  }, [selectedAreaCodes]);

  return (
    <div>
      {/* <Routes>
        <Route
          path="/activate/:uid/:token"
          element={<EmailVerify setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="*"
          element={
            <div className={styles.divFlex}>
              <Nav className={styles.appNav} setMapInitial={setMapInitial} />

              <div className={styles.appBody}>
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route
                    path="/login"
                    element={<Login setIsLoggedIn={setIsLoggedIn} />}
                  />
                  <Route path="/findId" element={<FindId />} />
                  <Route path="/findPw" element={<FindPw />} />
                  <Route
                    path="/signup"
                    element={<Signup setIsLoggedIn={setIsLoggedIn} />}
                  />
                  <Route path="/signup2" element={<Signup2 />} />
                  <Route path="/signup3" element={<Signup3 />} />
                  <Route path="/signup4" element={<Signup4 />} />
                  <Route
                    path="/activate/:Base64EncodingId/:token"
                    element={<EmailVerify />}
                  />
                  <Route
                    path="/home"
                    element={
                      <PrivateRoute
                        component={
                          <HouseList
                            houseData={houseData}
                            setSelectedHouse={setSelectedHouse}
                          />
                        }
                        isLoggedIn={isLoggedIn}
                      />
                    }
                  />

                  <Route
                    path="/write"
                    element={
                      <PrivateRoute
                        component={<Write token={token} />}
                        isLoggedIn={isLoggedIn}
                      />
                    }
                  />

                  <Route
                    path="/modify"
                    element={
                      <PrivateRoute
                        component={<Modify token={token} />}
                        isLoggedIn={isLoggedIn}
                      />
                    }
                  />

                  <Route
                    path="/search"
                    element={
                      <PrivateRoute
                        component={
                          <Search setSelectedHouse={setSelectedHouse} />
                        }
                        isLoggedIn={isLoggedIn}
                      />
                    }
                  />

                  <Route
                    path="/town"
                    element={
                      <PrivateRoute
                        component={
                          <TownHouseList
                            houseData={townHouseData}
                            setSelectedHouse={setSelectedHouse}
                            selectedAreaCodes={selectedAreaCodes}
                            setSelectedAreaCodes={setSelectedAreaCodes}
                            fetchData={fetchData}
                            townUrl={townUrl}
                            setTownHouseData={setTownHouseData}
                            token={token}
                          />
                        }
                        isLoggedIn={isLoggedIn}
                      />
                    }
                  />

                  <Route
                    path="/profile"
                    element={
                      <PrivateRoute
                        component={
                          <Profile
                            myHouseData={likeHouseData}
                            setSelectedHouse={setSelectedHouse}
                            token={token}
                          />
                        }
                        isLoggedIn={isLoggedIn}
                      />
                    }
                  />

                  <Route
                    path="/logout"
                    element={
                      <PrivateRoute
                        component={<Logout setIsLoggedIn={setIsLoggedIn} />}
                        isLoggedIn={isLoggedIn}
                      />
                    }
                  />

                  <Route
                    path="/detail"
                    element={
                      selectedHouse ? (
                        <PrivateRoute
                          component={
                            <ReviewList
                              selectedHouse={selectedHouse}
                              setSelectedHouse={setSelectedHouse}
                              setMapInitial={setMapInitial}
                              isLiked={isLiked}
                              setIsLiked={setIsLiked}
                              token={token}
                            />
                          }
                          isLoggedIn={isLoggedIn}
                        />
                      ) : (
                        <Navigate to="/home" replace />
                      )
                    }
                  />
                </Routes>
              </div>

              <div className={!isLoggedIn ? styles.appMapBlur : styles.appMap}>
                {!isLoggedIn && <div className={styles.toMapNotWork}></div>}
                <Map
                  houseData={
                    location.pathname === "/like"
                      ? likeHouseData
                      : location.pathname === "/town"
                      ? townHouseData
                      : houseData
                  }
                  selectedHouse={selectedHouse}
                  setSelectedHouse={setSelectedHouse}
                  mapInitial={mapInitial}
                  setMapInitial={setMapInitial}
                />
              </div>
            </div>
          }
        />
      </Routes> */}

      <div className={styles.divFlex}>
        <Nav className={styles.appNav} setMapInitial={setMapInitial} />

        <div className={styles.appBody}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route
              path="/login"
              element={<Login setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route path="/findId" element={<FindId />} />
            <Route path="/findPw" element={<FindPw />} />
            <Route path="/reset/:uid/:token" element={<ResetPw />} />
            <Route
              path="/signup"
              element={<Signup setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route path="/signup2" element={<Signup2 />} />
            <Route path="/signup3" element={<Signup3 />} />
            <Route path="/signup4" element={<Signup4 />} />
            <Route
              path="/activate/:Base64EncodingId/:token"
              element={<EmailVerify />}
            />
            <Route
              path="/home"
              element={
                <PrivateRoute
                  component={
                    <HouseList
                      houseData={houseData}
                      setSelectedHouse={setSelectedHouse}
                    />
                  }
                  isLoggedIn={isLoggedIn}
                />
              }
            />

            <Route
              path="/write"
              element={
                <PrivateRoute
                  component={<Write token={token} />}
                  isLoggedIn={isLoggedIn}
                />
              }
            />

            <Route
              path="/modify"
              element={
                <PrivateRoute
                  component={<Modify token={token} />}
                  isLoggedIn={isLoggedIn}
                />
              }
            />

            <Route
              path="/search"
              element={
                <PrivateRoute
                  component={<Search setSelectedHouse={setSelectedHouse} />}
                  isLoggedIn={isLoggedIn}
                />
              }
            />

            <Route
              path="/town"
              element={
                <PrivateRoute
                  component={
                    <TownHouseList
                      houseData={townHouseData}
                      setSelectedHouse={setSelectedHouse}
                      selectedAreaCodes={selectedAreaCodes}
                      setSelectedAreaCodes={setSelectedAreaCodes}
                      fetchData={fetchData}
                      townUrl={townUrl}
                      setTownHouseData={setTownHouseData}
                      token={token}
                    />
                  }
                  isLoggedIn={isLoggedIn}
                />
              }
            />

            <Route
              path="/profile"
              element={
                <PrivateRoute
                  component={
                    <Profile
                      myHouseData={likeHouseData}
                      setSelectedHouse={setSelectedHouse}
                      token={token}
                    />
                  }
                  isLoggedIn={isLoggedIn}
                />
              }
            />

            <Route
              path="/logout"
              element={
                <PrivateRoute
                  component={<Logout setIsLoggedIn={setIsLoggedIn} />}
                  isLoggedIn={isLoggedIn}
                />
              }
            />

            <Route
              path="/detail"
              element={
                selectedHouse ? (
                  <PrivateRoute
                    component={
                      <ReviewList
                        selectedHouse={selectedHouse}
                        setSelectedHouse={setSelectedHouse}
                        setMapInitial={setMapInitial}
                        isLiked={isLiked}
                        setIsLiked={setIsLiked}
                        token={token}
                      />
                    }
                    isLoggedIn={isLoggedIn}
                  />
                ) : (
                  <Navigate to="/home" replace />
                )
              }
            />
          </Routes>
        </div>

        <div className={!isLoggedIn ? styles.appMapBlur : styles.appMap}>
          {!isLoggedIn && <div className={styles.toMapNotWork}></div>}
          <Map
            houseData={
              location.pathname === "/like"
                ? likeHouseData
                : location.pathname === "/town"
                ? townHouseData
                : houseData
            }
            selectedHouse={selectedHouse}
            setSelectedHouse={setSelectedHouse}
            mapInitial={mapInitial}
            setMapInitial={setMapInitial}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
