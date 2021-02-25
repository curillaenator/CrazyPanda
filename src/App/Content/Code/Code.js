import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button } from "../../Common/Button/Button";
import { simplify } from "../../../CodeTasks/Polinomials";
import { findNumbers } from "../../../CodeTasks/Numbers";
import polinomials from "../../../CodeTasks/Polinomials.txt";
import numbers from "../../../CodeTasks/Numbers.txt";

import styles from "./code.module.scss";

const Polinomials = () => {
  const [input, setInput] = useState("");
  const handleInput = (e) => setInput(e.target.value);
  const [result, setResult] = useState(null);
  const execute = () => setResult(simplify(input));

  const examples = [
    "-a+5ab+3a-c-2a",
    "3a-abc+2a+3cba",
    "-10bxy+8x-5bxy+9yxb-2x-9xyb-3x",
    "xzy+zby",
  ];

  return (
    <div className={styles.polinomials}>
      <div className={styles.info}>
        <h3>Примеры:</h3>
        {examples.map((e) => (
          <p key={e}>{e}</p>
        ))}
      </div>

      <div className={styles.run}>
        <input type="text" onInput={handleInput} />
        <Button
          title="запустить"
          width="96px"
          height="32px"
          handler={execute}
        />
      </div>
      {result && (
        <div className={styles.result}>
          <h3>Результат: {result}</h3>
        </div>
      )}
    </div>
  );
};

const Numbers = () => {
  const [A, setA] = useState("");
  const handleInputA = (e) => setA(e.target.value);
  const [B, setB] = useState("");
  const handleInputB = (e) => setB(e.target.value);

  const [result, setResult] = useState(null);
  const execute = () => A && B && setResult(findNumbers(+A, +B));

  return (
    <div className={styles.numbers}>
      <div className={styles.info}>
        <h3>Примеры:</h3>
        <p>A=10, B=3</p>
        <p>A=27, B=3</p>
        <p>A=35, B=6</p>
      </div>
      <div className={styles.run}>
        <p>Сумма цифр (А):</p>
        <input type="text" onInput={handleInputA} />
        <p>Разрядность искомых чисел (B):</p>
        <input type="text" onInput={handleInputB} />
        <Button
          title="запустить"
          width="96px"
          height="32px"
          handler={execute}
        />
      </div>
      {result && (
        <div className={styles.result}>
          <h3>Результат:</h3>
          {result.map((r) => (
            <p key={r}>{r}</p>
          ))}
        </div>
      )}
    </div>
  );
};

const Case = ({ c, pol, num }) => {
  const [codeMode, setCodeMode] = useState(false);
  const codeHandler = () => setCodeMode(!codeMode);

  const [testMode, setTestMode] = useState(false);
  const testHandler = () => setTestMode(!testMode);

  return (
    <div className={styles.case} key={c.title}>
      <h3>{c.title}</h3>
      <p>{c.description}</p>
      <div className={styles.buttons}>
        <Button
          title={codeMode ? "скрыть код" : "показать код"}
          width="128px"
          height="40px"
          handler={codeHandler}
          activated={codeMode}
        />
        <Button
          title={testMode ? "закрыть тест" : "посмотреть в работе"}
          width="196px"
          height="40px"
          handler={testHandler}
          activated={testMode}
        />
      </div>
      {testMode && (
        <div className={styles.test}>
          {c.name === "polinomials" && <Polinomials />}
          {c.name === "numbers" && <Numbers />}
        </div>
      )}
      {codeMode && (
        <div className={styles.code}>
          {c.name === "polinomials" && <pre>{pol}</pre>}
          {c.name === "numbers" && <pre>{num}</pre>}
        </div>
      )}
    </div>
  );
};

const Code = (props) => {
  const [init, setInit] = useState(false);
  const [pol, setPol] = useState(null);
  const [num, setNum] = useState(null);

  const getCases = async () => {
    await fetch(polinomials)
      .then((r) => r.text())
      .then((t) => setPol(t));
    await fetch(numbers)
      .then((r) => r.text())
      .then((t) => setNum(t));
    setInit(true);
  };

  useEffect(() => getCases(), []);

  if (!init) return <div className={styles.coding}>Загрузка...</div>;

  return (
    <div className={styles.coding}>
      {props.cases.map((c) => (
        <Case c={c} pol={pol} num={num} key={c.name} />
      ))}
    </div>
  );
};

const mstp = (state) => ({
  cases: state.code.cases,
});

export const CodeCont = connect(mstp, {})(Code);
