import styles from "./ModalBasic.module.css";
import JusoPopup from "./JusoPopup";

function ModalBasic({ setModalOpen, onReturnValue, onClose }) {
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.title}>주소 검색</span>
        <span className={styles.close} onClick={closeModal}>
          &times;
        </span>
      </div>
      <JusoPopup onClose={onClose} onReturnValue={onReturnValue} />
    </div>
  );
}

export default ModalBasic;
