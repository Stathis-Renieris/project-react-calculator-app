import { Fragment, useEffect, useRef, useState } from "react";

import Calculator from "./components/Calculator";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";

const buttonValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];

// toLocaleString() - It takes a number, formats it into the string format and creates the space separators for the thousand mark:
const toLocaleString = (num) =>
  String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

// removeSpaces() - removes the spaces from a string, so it can later be converted to a number:
const removeSpaces = (num) => num.toString().replace(/\s/g, "");

const App = () => {
  // The following 8 lines are used to auto calculate a minHeight for the <main> element based on <header> and <footer> heights:
  const [headerHeight, setHeaderHeight] = useState(0);
  const [footerHeight, setFooterHeight] = useState(0);
  const headerRef = useRef(null);
  const footerRef = useRef(null);
  useEffect(() => {
    setHeaderHeight(headerRef.current.clientHeight);
    setFooterHeight(footerRef.current.clientHeight);
  }, [headerRef, footerRef]);

  const [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
  });

  // Event handlers for different types of buttons:
  const numClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    if (removeSpaces(calc.num).length < 16) {
      setCalc({
        ...calc,
        num:
          calc.num === 0 && value === "0"
            ? "0"
            : removeSpaces(calc.num) % 1 === 0
            ? toLocaleString(Number(removeSpaces(calc.num + value)))
            : toLocaleString(calc.num + value),
        res: !calc.sign ? 0 : calc.res,
      });
    }
  };

  const commaClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    });
  };

  const signClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0,
    });
  };

  const equalsClickHandler = () => {
    if (calc.sign && calc.num) {
      const math = (a, b, sign) =>
        sign === "+"
          ? a + b
          : sign === "-"
          ? a - b
          : sign === "X"
          ? a * b
          : a / b;

      setCalc({
        ...calc,
        res:
          calc.num === "0" && calc.sign === "/"
            ? "Can't divide with 0"
            : toLocaleString(
                math(
                  Number(removeSpaces(calc.res)),
                  Number(removeSpaces(calc.num)),
                  calc.sign
                )
              ),
        sign: "",
        num: 0,
      });
    }
  };

  const invertClickHandler = () => {
    setCalc({
      ...calc,
      num: calc.num ? toLocaleString(removeSpaces(calc.num) * -1) : 0,
      res: calc.res ? toLocaleString(removeSpaces(calc.res) * -1) : 0,
      sign: "",
    });
  };

  const percentClickHandler = () => {
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;

    setCalc({
      ...calc,
      num: (num /= Math.pow(100, 1)),
      res: (res /= Math.pow(100, 1)),
      sign: "",
    });
  };

  const resetClickHandler = () => {
    setCalc({
      ...calc,
      sign: "",
      num: 0,
      res: 0,
    });
  };

  return (
    <Fragment>
      <header ref={headerRef}>
        <h1>A simple react calculator</h1>
      </header>
      <main
        style={{ minHeight: `calc(100vh - ${headerHeight + footerHeight}px)` }}
      >
        <Calculator>
          <Screen value={calc.num ? calc.num : calc.res} />
          <ButtonBox>
            {buttonValues.flat().map((button, i) => {
              return (
                <Button
                  key={i}
                  isEqualsButton={button === "="}
                  value={button}
                  onClick={
                    button === "C"
                      ? resetClickHandler
                      : button === "+-"
                      ? invertClickHandler
                      : button === "%"
                      ? percentClickHandler
                      : button === "="
                      ? equalsClickHandler
                      : button === "/" ||
                        button === "X" ||
                        button === "-" ||
                        button === "+"
                      ? signClickHandler
                      : button === "."
                      ? commaClickHandler
                      : numClickHandler
                  }
                />
              );
            })}
          </ButtonBox>
        </Calculator>
      </main>
      <footer ref={footerRef}>
        <p>
          Made by{" "}
          <a href="https://github.com/Stathis-Renieris">Stathis Renieris</a>{" "}
          with ❤️
        </p>
      </footer>
    </Fragment>
  );
};

export default App;
