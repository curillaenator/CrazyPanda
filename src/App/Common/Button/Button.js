import styles from "./button.module.scss";

export const Button = ({ title, width, height, handler }) => {
  const handleClick = () => handler && handler();
  return (
    <button
      className={styles.button}
      style={{ width, height }}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};
