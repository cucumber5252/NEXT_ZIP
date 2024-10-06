import styles from "./SignUp4.module.css";
import { useState, useEffect } from "react";
import { ReactComponent as VerifiedTextImg } from "../../assets/verifiedTextImg.svg";
import { useNavigate } from "react-router-dom";

function SignUp4({ onNext }) {
  const [email, setEmail] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [isMailSended, setIsMailSended] = useState(false);
  const [number, setNumber] = useState("");
  const [showNumberInput, setShowNumberInput] = useState(false);

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNumber(e.target.value);
  };

  const sendEmail = () => {
    const apiUrl = `https://backend.kuzip.kr/usercontrol/verify_email/${email}@korea.ac.kr/`;

    fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.message.includes("409")) {
          alert("이미 가입된 이메일입니다!");
          navigate("/login");
        } else if (error.message.includes("400")) {
          alert("이메일을 너무 많이 발송했습니다!");
          navigate("/signup");
        } else {
          alert("에러가 발생했습니다. 다시 시도해주세요.");
        }
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTimeLeft(5 * 60);
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

    setShowNumberInput(true);
    sendEmail();
    if (!isMailSended) {
      setIsMailSended(true);
      return;
    }
  };
  const handleLinkMove = () => {
    window.open("https://naver.worksmobile.com/", "_blank");
  };

  const handleEmailComplete = (e) => {
    e.preventDefault();

    if (number.length !== 6) {
      alert("인증번호는 6자리여야 합니다.");
      return;
    }
    const data = { email: email + "@korea.ac.kr", token: number };
    onNext(data);
  };

  useEffect(() => {
    if (timeLeft > 0) {
      const intervalId = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);

      return () => clearInterval(intervalId);
    } else {
      setShowNumberInput(false);
    }
  }, [timeLeft]);

  return (
    <div className={styles.signup4_div}>
      <div className={styles.emailInputDiv}>
        <VerifiedTextImg className={styles.emailInputTitle} />
        <div className={styles.emailInputText}>
          학교 공식 메일로 고려대학교 구성원임을 인증해주세요!
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
            <div>
              {timeLeft > 0
                ? `인증 가능 시간이 ${Math.floor(timeLeft / 60)}분 ${
                    timeLeft % 60
                  }초 남았습니다.`
                : "시간이 초과되었습니다."}
            </div>
          )}
          <br />
          <div className={styles.emailButtons}>
            <button
              className={styles.emailInputFormButton}
              onClick={handleSubmit}
              type="submit"
            >
              {isMailSended ? "인증 메일 재발송" : "인증 메일 발송"}
            </button>
            {isMailSended && (
              <div
                className={styles.emailInputLinkMoveButton}
                onClick={handleLinkMove}
              >
                메일 바로가기
              </div>
            )}
          </div>
        </form>
      </div>

      {showNumberInput && (
        <div className={styles.numberInputDiv}>
          <form className={styles.emailInputForm}>
            <input
              className={styles.numberInput}
              type="number"
              value={number}
              onChange={handleNumberChange}
            ></input>
            <button
              className={styles.numberInputFormButton}
              onClick={handleEmailComplete}
            >
              인증하기
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default SignUp4;
