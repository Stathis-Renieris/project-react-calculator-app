import classes from "./Calculator.module.css";

const Calculator = ({ children }) => {
  return <div className={classes.calculator}>{children}</div>;
};

export default Calculator;
