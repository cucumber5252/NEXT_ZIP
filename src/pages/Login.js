import styles from "./Login.module.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login(setIsLoggedIn) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("아이디:", username);
    console.log("비밀번호:", password);

    const apiUrl = "https://backend.kuzip.kr/user-control/login/";
    fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
      }),
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        const token = data.key;
        console.log("login-token: ", token);
        localStorage.setItem("login-token", token);
        if (token) {
          setIsLoggedIn(true);
          navigate("/home");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("아이디 또는 비밀번호가 잘못되었습니다.");
      });
  };

  const handleFindID = () => {
    console.log("findId");
  };
  const handleFindPW = () => {
    console.log("findpw");
  };

  return (
    <div className={styles.divSize}>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <div className={styles.idContainer}>
          <div className={styles.idTitleDiv}>
            <label className={styles.labelId}>아이디</label>
            <Link
              to="/findId"
              className={styles.idFindButton}
              onClick={handleFindID}
            >
              아이디를 잊어버리셨나요?
            </Link>
          </div>
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            className={styles.id}
            placeholder="아이디를 입력하세요"
          />
        </div>
        <br />
        <div className={styles.passwordContainer}>
          <div className={styles.passwordTitleDiv}>
            <label className={styles.labelPassword}>비밀번호</label>
            <Link
              to="/findPw"
              className={styles.passwordFindButton}
              onClick={handleFindPW}
            >
              비밀번호를 잊어버리셨나요?
            </Link>
          </div>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className={styles.password}
            placeholder="비밀번호를 입력하세요"
          />
        </div>

        <br />
        <button type="submit" className={styles.Login}>
          LOG IN
        </button>
      </form>
    </div>
  );
}

export default Login;
