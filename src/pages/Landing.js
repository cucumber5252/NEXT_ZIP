import styles from "./Landing.module.css";
import { ReactComponent as SignupButton } from "../assets/signupImg.svg";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div className={styles.landingDiv}>
      <Link to="/signup">
        <SignupButton className={styles.signupButtonImg} />
      </Link>
      <Link to="/login" className={styles.loginButton}>
        LOG IN
      </Link>
    </div>
  );
}

export default Landing;
