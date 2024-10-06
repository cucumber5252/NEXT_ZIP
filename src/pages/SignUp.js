import styles from "./SignUp.module.css";
import { useState } from "react";
import SignUp1 from "../components/SignUp/SignUp1.js";
import SignUp2 from "../components/SignUp/SignUp2.js";
import SignUp3 from "../components/SignUp/SignUp3.js";
import SignUp4 from "../components/SignUp/SignUp4.js";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function SignUp({ setIsLoggedIn }) {
  const [signUp1Data, setSignUP1Data] = useState({});
  const [signUp2Data, setSignUP2Data] = useState({});
  const [interestedArea, setInterstedArea] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [signupToken, setSignupToken] = useState("");
  const [step, setStep] = useState(1);

  const navigate = useNavigate();

  const onNext = (data) => {
    if (step === 1) {
      setSignUP1Data((prev) => ({
        ...prev,
        ...data,
      }));
      setStep((prev) => prev + 1);
    } else if (step === 2) {
      setSignUP2Data((prev) => ({
        ...prev,
        ...data,
      }));
      setStep((prev) => prev + 1);
    } else if (step === 3) {
      setInterstedArea((prev) => [...prev, ...data]);
      setStep((prev) => prev + 1);
    } else if (step === 4) {
      setUserEmail(data.email);
      setSignupToken(data.token);
      // onSend();
    }
  };

  useEffect(() => {
    if (step === 4 && userEmail !== "") {
      onSend();
      console.log("전송되었습니다!");
    }
  }, [userEmail]);

  const onSendToPost = () => {
    const apiUrl = "https://backend.kuzip.kr/usercontrol/user-config/";

    const body = {
      email: userEmail,
      token: signupToken,
      id: signUp1Data.id,
      password: signUp1Data.password,
      nickname: signUp2Data.nickname,
      student_number: signUp2Data.studentNumber,
      sex: signUp2Data.gender,
      department: signUp2Data.department,
      interested_areas: interestedArea,
    };

    console.log("body:", body);

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      mode: "cors",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("responseData:", data);
        localStorage.setItem("login-token", data);
      })
      .then(() => {
        alert("인증되었습니다!");
      })
      .catch((error) => {
        error.json().then((mess) => console.log(mess));
      });
  };

  const onSend = () => {
    const apiUrl = "https://backend.kuzip.kr/usercontrol/activate/";

    const body = {
      email: userEmail,
      token: signupToken,
    };

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      mode: "cors",
    })
      .then((response) => {
        if (response.ok) {
          console.log("인증 완료!");
          onSendToPost();
        }
      })
      .then(() => {
        const loginToken = localStorage.getItem("login-token");
        console.log("login-token: ", loginToken);

        if (loginToken) {
          setIsLoggedIn(true);
          navigate("/home");
        }
      })
      .catch((error) => {
        error.json().then((mess) => console.log(mess));
      });
  };

  return (
    <>
      <div className={styles.divSize}>
        {step === 1 && <SignUp1 onNext={onNext} />}
        {step === 2 && <SignUp2 onNext={onNext} />}
        {step === 3 && <SignUp3 onNext={onNext} />}
        {step === 4 && <SignUp4 onNext={onNext} />}
      </div>
    </>
  );
}

export default SignUp;
