import styles from "./PriceInput.module.css";

const PriceInput = ({
  rentType,
  deposit,
  setDeposit,
  monthlyRent,
  setMonthlyRent,
  maintenance,
  setMaintenance,
}) => {
  const formatNumberWithCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleInputChange = (e, setValueFunction) => {
    const rawValue = e.target.value.replace(/,/g, "");
    if (/^\d*$/.test(rawValue)) {
      setValueFunction(rawValue);
    }
  };

  if (rentType === "monthly") {
    return (
      <div className={styles.priceContainer}>
        <div className={styles.priceLabel}>
          <div className={styles.priceLabelTitle}>보증금</div>
          <input
            placeholder="만원 단위"
            type="text"
            value={formatNumberWithCommas(deposit)}
            onChange={(e) => handleInputChange(e, setDeposit)}
            className={styles.priceInput}
          />
        </div>
        <div className={styles.priceLabel}>
          <div className={styles.priceLabelTitle}>월세</div>
          <input
            placeholder="만원 단위"
            type="text"
            value={formatNumberWithCommas(monthlyRent)}
            onChange={(e) => handleInputChange(e, setMonthlyRent)}
            className={styles.priceInput}
          />
        </div>
        <div className={styles.priceLabel}>
          <div className={styles.priceLabelTitle}>관리비</div>
          <input
            placeholder="만원 단위"
            type="text"
            value={formatNumberWithCommas(maintenance)}
            onChange={(e) => handleInputChange(e, setMaintenance)}
            className={styles.priceInput}
          />
        </div>
      </div>
    );
  } else if (rentType === "jeon") {
    return (
      <div className={styles.priceContainer}>
        <div className={styles.priceLabel}>
          <div className={styles.priceLabelTitle}>전세금</div>
          <input
            placeholder="만원 단위"
            type="text"
            value={formatNumberWithCommas(deposit)}
            onChange={(e) => handleInputChange(e, setDeposit)}
            className={styles.priceInput}
          />
        </div>
        <div className={styles.priceLabel}>
          <div className={styles.priceLabelTitle}>관리비</div>
          <input
            placeholder="만원 단위"
            type="text"
            value={formatNumberWithCommas(maintenance)}
            onChange={(e) => handleInputChange(e, setMaintenance)}
            className={styles.priceInput}
          />
        </div>
      </div>
    );
  }
};

export default PriceInput;
