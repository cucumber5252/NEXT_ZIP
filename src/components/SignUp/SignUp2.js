import styles from "./SignUp2.module.css";
import { useState } from "react";
import Select from "react-select";

const studentNumberOptions = [];
for (let i = 23; i >= 13; i--) {
  studentNumberOptions.push({ value: i, label: `${i}학번` });
}

const genderOptions = [
  { value: "M", label: "남자" },
  { value: "F", label: "여자" },
  { value: "NM", label: "밝히고 싶지 않음" },
];

const departmentOptions = [
  { value: "경영대학", label: "경영대학" },
  { value: "문과대학", label: "문과대학" },
  { value: "정경대학", label: "정경대학" },
  { value: "이과대학", label: "이과대학" },
  { value: "공과대학", label: "공과대학" },
  { value: "의과대학", label: "의과대학" },
  { value: "사범대학", label: "사범대학" },
  { value: "간호대학", label: "간호대학" },
  { value: "생명과학대학", label: "생명과학대학" },
  { value: "정보대학", label: "정보대학" },
  { value: "보건과학대학", label: "보건과학대학" },
  { value: "디자인조형학부", label: "디자인조형학부" },
  { value: "국제대학", label: "국제대학" },
  { value: "미디어학부", label: "미디어학부" },
  { value: "자유전공학부", label: "자유전공학부" },
  { value: "스마트보안학부", label: "스마트보안학부" },
  { value: "심리학부", label: "심리학부" },
];

function SignUp2({ onNext }) {
  const [nickname, setNickname] = useState("");
  const [studentNumber, setStudentNumber] = useState(null);
  const [gender, setGender] = useState(null);
  const [department, setDepartment] = useState(null);
  const [valid, setValid] = useState(true);

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleStudentNumberChange = (selectedOption) => {
    setStudentNumber(selectedOption);
  };

  const handleGenderChange = (selectedOption) => {
    setGender(selectedOption);
  };

  const handleDepartmentChange = (selectedOption) => {
    setDepartment(selectedOption);
  };

  const checkNickname = async () => {
    const apiUrl = `https://backend.kuzip.kr/usercontrol/verify-nickname/${nickname}`;
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    });
    const data = await response.json();
    console.log("nick", data.valid);
    if (data.valid) {
      if (valid) {
        handleNext();
      }
    } else {
      setValid(false);
      alert("이미 사용중인 닉네임입니다. 닉네임을 변경해주세요!");
    }
  };

  const handleNext = () => {
    const data = {
      nickname,
      studentNumber: studentNumber.value,
      department: department.value,
      gender: gender.value,
    };
    onNext(data);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nickname) {
      alert("사용할 닉네임을 입력해주세요!");
    } else if (!department) {
      alert("소속 단과대를 입력해주세요!");
    } else if (!studentNumber) {
      alert("출생연도를 입력해주세요!");
    } else if (!gender) {
      alert("성별을 입력해주세요!");
    } else {
      checkNickname();
    }
  };

  return (
    <div className={styles.signup2_div}>
      <div className={styles.h6_text}>
        해당 정보는 외부에 공개되지 않으며 향후 자택 추천 서비스 개발 목적으로만
        활용될 예정이니 안심하고 입력하세요!
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputDiv}>
          <label className={styles.nicknameLabel}>닉네임</label>
          <input
            className={styles.input}
            type="text"
            value={nickname}
            onChange={handleNicknameChange}
            placeholder="사용할 닉네임을 입력해주세요"
          />
        </div>
        <div className={styles.inputDiv} id="department">
          <label className={styles.departmentLabel}>단과대</label>
          <Select
            className={styles.select}
            options={departmentOptions}
            value={department}
            onChange={handleDepartmentChange}
            placeholder="소속 단과대학을 선택해주세요"
          />
        </div>

        <div className={styles.inputDiv} id="studentNumber">
          <label className={styles.studentNumberLabel}>학번</label>
          <Select
            className={styles.select}
            options={studentNumberOptions}
            value={studentNumber}
            onChange={handleStudentNumberChange}
            placeholder="학번을 선택해주세요"
          />
        </div>

        <div className={styles.inputDiv}>
          <label className={styles.genderLabel}>성별</label>
          <Select
            className={styles.select}
            options={genderOptions}
            value={gender}
            defaultValue={genderOptions[2]}
            onChange={handleGenderChange}
            placeholder="성별을 선택해주세요"
          />
        </div>

        <button className={styles.submitButton} type="submit">
          Next
        </button>
      </form>
    </div>
  );
}

export default SignUp2;
