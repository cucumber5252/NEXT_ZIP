import styles from "./SignUp1.module.css";
import { useState } from "react";

function SignUp1({ onNext }) {
  const [id, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordCheckChange = (e) => {
    setPasswordCheck(e.target.value);
  };

  const checkId = () => {
    const apiUrl = `https://backend.kuzip.kr/usercontrol/verify-id/${id}/`;
    fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.valid);
        if (data.valid) {
          const data = { id, password };
          onNext(data);
        } else {
          alert("이미 사용중인 아이디입니다.");
        }
      })
      .catch((error) => {
        const data = error.json();
        const valid = data.valid;
        console.log("what", valid);
        alert("이미 사용중인 아이디입니다.");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 간단한 validation 체크
    if (id.trim().length < 5) {
      alert("아이디는 5글자 이상이어야 합니다.");
    } else if (id.includes(" ")) {
      alert("아이디에 공백이 포함되면 안됩니다.");
    } else if (password.length < 8) {
      alert("비밀번호는 8글자 이상이어야 합니다.");
    } else if (!/\d/.test(password)) {
      alert("비밀번호는 숫자를 포함해야 합니다.");
    } else if (password !== passwordCheck) {
      alert("비밀번호가 서로 같지 않습니다.");
    } else {
      checkId();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.signup1Form}>
        <div className={styles.idContainer}>
          <label className={styles.labelId}>아이디</label>
          <input
            type="text"
            value={id}
            onChange={handleUsernameChange}
            className={styles.id}
            placeholder="5글자 이상, 공백 없이 입력해주세요!"
          />
        </div>
        <br />

        <div className={styles.passwordContainer}>
          <label className={styles.labelPassword}>비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className={styles.password}
            placeholder="영문,숫자를 포함하여 8글자 이상 입력해주세요!"
          />
        </div>
        <br />

        <div className={styles.passwordcheckContainer}>
          <label className={styles.labelPasswordcheck}>비밀번호 확인</label>
          <input
            type="password"
            value={passwordCheck}
            onChange={handlePasswordCheckChange}
            className={styles.passwordcheck}
            placeholder="다시한번 입력해주세요!"
          />
        </div>

        <button type="submit" className={styles.button}>
          Next
        </button>
      </form>
    </>
  );
}

export default SignUp1;
