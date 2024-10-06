// import styles from "./EmailVerify.module.css";
import { useParams } from "react-router-dom";

function EmailVerify(setIsLoggedIn) {
  const { uid, token } = useParams();

  const apiUrl = `https://backend.kuzip.kr/usercontrol/activate/${uid}/${token}`;

  fetch(apiUrl, {
    method: "GET",
    headers: {
      Authorization: `Token ${token}`,
    },
    mode: "cors",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setIsLoggedIn(true);
    })
    .then(() => {
      alert(
        "인증이 완료되었습니다. 회원가입 페이지로 돌아가 인증 완료 버튼을 눌러주세요!"
      );
    })
    .catch((error) => console.log(error));
}

export default EmailVerify;
