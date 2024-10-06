import styles from "./FindPw.module.css";
import { useState } from "react";
import { ReactComponent as ForgetTextImg } from "../assets/forgetTextImg.svg";
import { useNavigate } from "react-router-dom";

function FindPw() {
  const [email, setEmail] = useState("");
  const [isMailSended, setIsMailSended] = useState(false);

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMoveToMail = () => {
    window.open("https://naver.worksmobile.com/", "_blank");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === "") {
      alert("이메일 주소를 입력해주세요!");
      return;
    }

    const hasKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(email);
    if (hasKorean) {
      alert("올바른 형식의 메일을 입력해주세요!");
      setEmail("");
      return;
    }

    //fetch 만들 자리
    const apiUrl = "https://backend.kuzip.kr/usercontrol/send-reset-email/";

    const body = {
      email: email + "@korea.ac.kr",
    };

    console.log(body);
    fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      mode: "cors",
    })
      .then((response) => response.json())
      .then(() => {
        setIsMailSended(true);
      })
      .catch((error) => {
        console.log(error);
        alert("가입되지 않은 이메일입니다.");
      });
  };

  const handleMoveToLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div className={styles.signup4_div}>
      <div className={styles.emailInputDiv}>
        <ForgetTextImg className={styles.emailInputTitle} />
        <div className={styles.emailInputText}>
          가입 시 입력한 학교 메일로 비밀번호를 재설정하세요!
        </div>
        <form className={styles.emailInputForm}>
          <div className={styles.emailInputInnerFormDiv}>
            <input
              className={styles.emailInput}
              type="text"
              value={email}
              onChange={handleEmailChange}
            ></input>
            <span className={styles.emailInputInnerSpan}>@korea.ac.kr</span>
          </div>
          {isMailSended && (
            <div className={styles.emailSendedText}>
              전송된 메일을 확인하세요!
            </div>
          )}
          <br />

          {!isMailSended ? (
            <button
              className={styles.emailInputFormButton}
              onClick={handleSubmit}
              type="submit"
            >
              비밀번호 재설정하기
            </button>
          ) : (
            <div className={styles.emailButtons}>
              <div
                className={styles.emailInputLinkMoveButton}
                onClick={handleMoveToMail}
              >
                메일 바로가기
              </div>
              <div
                className={styles.emailInputLinkMoveButton}
                onClick={handleMoveToLogin}
              >
                로그인
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default FindPw;
