import { Link } from "react-router-dom";

import logoImg from "../../assets/Main/logoImg.svg";
import writeImg from "../../assets/Main/writeImg.svg";
import { ReactComponent as SearchImg } from "../../assets/Main/searchImg.svg";
// import likeImg from "../../assets/Main/likeImg.svg";
import townImg from "../../assets/Main/townImg.svg";
import { ReactComponent as ProfileImg } from "../../assets/Main/profileImg.svg";
import logoutImg from "../../assets/Main/logoutImg.svg";

import styles from "./Nav.module.css";

function Nav({ setMapInitial }) {
  return (
    <div className={styles.nav}>
      <div className={styles.navbar}>
        <Link
          to="/home"
          className={styles.icon}
          onClick={() => setMapInitial(true)}
        >
          <img src={logoImg} alt="ZIP LOGO" className={styles.mainImg} />
        </Link>
        <Link to="/write" className={styles.icon}>
          <img src={writeImg} alt="Write LOGO" className={styles.iconImg} />
          <span className={styles.iconSpan}>리뷰 쓰기</span>
        </Link>
        <Link to="/search" className={styles.icon}>
          <SearchImg fill="white" className={styles.iconImg} />
          <span className={styles.iconSpan}>조건 검색</span>
        </Link>

        <Link
          to="/town"
          className={styles.icon}
          onClick={() => setMapInitial(true)}
        >
          <img src={townImg} alt="Town LOGO" className={styles.iconImg} />
          <span className={styles.iconSpan}>관심 동네 보기</span>
        </Link>
        <Link
          to="/profile"
          className={styles.icon}
          onClick={() => setMapInitial(true)}
        >
          <ProfileImg className={styles.iconImg} />
          <span className={styles.iconSpan}>내 프로필</span>
        </Link>
        <Link to="/logout" className={styles.icon}>
          <img src={logoutImg} alt="Logout LOGO" className={styles.iconImg} />
          <span className={styles.iconSpan}>로그아웃</span>
        </Link>
      </div>
    </div>
  );
}

export default Nav;
