import styles from "./ResetPw.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { ReactComponent as ResetTextImg } from "../assets/resetTextImg.svg";

function ResetPw({ setIsLoggedIn }) {
  const { uid, token } = useParams();
  const [verifyToken, setVerifyToken] = useState("");
  const [newPw, setNewPw] = useState("");
  const [newPwCheck, setNewPwCheck] = useState("");

  const navigate = useNavigate();
  const apiUrl = `https://backend.kuzip.kr/usercontrol/verify-reset-email/${uid}/${token}`;

  fetch(apiUrl, {
    method: "GET",
    headers: {
      Authorization: `Token ${token}`,
    },
    mode: "cors",
  })
    .then((response) => response.json())
    .then((data) => {
      setVerifyToken(data.verfication_token);
    })
    .catch((error) => console.log(error));

  const handleNewPwChange = (e) => {
    setNewPw(e.target.value);
  };

  const handleNewPwCheckChange = (e) => {
    setNewPwCheck(e.target.value);
  };

  const handleSubmit = () => {
    //비밀번호 validation check
    if (newPw.length < 8) {
      alert("비밀번호는 8글자 이상이어야 합니다.");
      return;
    } else if (!/\d/.test(newPw)) {
      alert("비밀번호는 숫자를 포함해야 합니다.");
      return;
    } else if (newPw !== newPwCheck) {
      alert("비밀번호가 서로 같지 않습니다.");
      return;
    }

    const apiUrl = `https://backend.kuzip.kr/usercontrol/reset-password`;
    const body = {
      verfication_token: verifyToken,
      password: newPw,
    };

    console.log(body);

    fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(body),
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        const token = data.token;
        console.log("login-token: ", token);
        localStorage.setItem("login-token", token);

        if (token) {
          setIsLoggedIn(true);
          alert("비밀번호 재설정이 완료되었습니다!");
          navigate("/home");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className={styles.signup4_div}>
      <div className={styles.emailInputDiv}>
        <ResetTextImg className={styles.emailInputTitle} />
        <br />
        <form className={styles.emailInputForm}>
          <div className={styles.passwordContainer}>
            <div className={styles.labelPassword}>비밀번호</div>
            <input
              type="password"
              value={newPw}
              onChange={handleNewPwChange}
              className={styles.passwordInput}
              placeholder="영문,숫자를 포함하여 8글자 이상 입력해주세요!"
            />
          </div>
          <br />

          <div className={styles.passwordcheckContainer}>
            <div className={styles.labelPasswordcheck}>비밀번호 확인</div>
            <input
              type="password"
              value={newPwCheck}
              onChange={handleNewPwCheckChange}
              className={styles.passwordcheckInput}
              placeholder="다시한번 입력해주세요!"
            />
          </div>

          <br />
          <button
            className={styles.emailInputFormButton}
            onClick={handleSubmit}
            type="submit"
          >
            비밀번호 재설정하기
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPw;
