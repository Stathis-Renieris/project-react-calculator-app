import { Fragment } from "react";

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

const App = () => {
  return (
    <Fragment>
      <header>
        <h1>A simple react calculator</h1>
      </header>
      <main>
        <Calculator>
          <Screen value="0" />
          <ButtonBox>
            {buttonValues.flat().map((button, i) => {
              return (
                <Button
                  key={i}
                  isEqualsButton={button === "="}
                  value={button}
                  onClick={() => {
                    console.log(`${button} clicked!`);
                  }}
                />
              );
            })}
          </ButtonBox>
        </Calculator>
      </main>
      <footer>
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
