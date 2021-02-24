import { connect } from "react-redux";
import styles from "./code.module.scss";
// import simplify from "../../../CodeTasks/Polinomials";

const Code = (props) => {
  return (
    <div className={styles.code}>
      {props.cases.map((c) => (
        <div className={styles.case} key={c.title}>
          <h3>{c.title}</h3>
          <p>{c.description}</p>
          <p>{c.code}</p>
        </div>
      ))}
    </div>
  );
};

const mstp = (state) => ({
  cases: state.code.cases,
});

export const CodeCont = connect(mstp, {})(Code);
