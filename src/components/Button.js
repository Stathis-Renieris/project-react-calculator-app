import classes from "./Button.module.css";

const Button = ({ isEqualsButton = false, value, onClick }) => {
  return (
    <button
      className={`${classes.button} ${isEqualsButton && classes.equals}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Button;
