import { connect } from "react-redux";
import {
  setMode,
  setColor,
  setBgc,
} from "../../../Redux/Reducers/slidersReducer";

import styles from "./sliders.module.scss";
import { Button } from "../../Common/Button/Button";

const Item = ({ mode, name, color, setColor, bgc, setBgc }) => {
  const newColor = { ...color };
  const newBgc = { ...bgc };

  const colorHandler = (e) => {
    if (mode === "color") {
      newColor[name] = e.target.value;
      setColor(newColor);
    }
    if (mode === "backgroundColor") {
      newBgc[name] = e.target.value;
      setBgc(newBgc);
    }
  };

  const value =
    (mode === "color" && color[name]) ||
    (mode === "backgroundColor" && bgc[name]);
  return (
    <div className={styles.item}>
      <input
        className={styles[name]}
        type="range"
        min={0}
        max={255}
        value={value}
        onInput={colorHandler}
      />
    </div>
  );
};

const ViewField = ({ color, bgc }) => {
  const colorRGB = `RGB(${color.red},${color.green},${color.blue})`;
  const bgRGB = `RGB(${bgc.red},${bgc.green},${bgc.blue})`;

  return (
    <div className={styles.viewfield} style={{ backgroundColor: `${bgRGB}` }}>
      <p style={{ color: `${colorRGB}` }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos voluptatum
        explicabo rerum est, at aut?
      </p>
    </div>
  );
};

const Sliders = ({ sliders, setMode, ...props }) => {
  const modeHandler = (arg) => setMode(arg);
  return (
    <div className={styles.sliders}>
      <div className={styles.selector}>
        <Button
          width="128px"
          height="40px"
          title="шрифт"
          handler={modeHandler}
          handlerArgs="color"
          activated={props.mode === "color"}
        />
        <Button
          width="128px"
          height="40px"
          title="фон"
          handler={modeHandler}
          handlerArgs="backgroundColor"
          activated={props.mode === "backgroundColor"}
        />
      </div>
      <div className={styles.view}>
        <div className={styles.slidersfield}>
          {sliders.map((s) => (
            <Item
              key={s.name}
              name={s.name}
              mode={props.mode}
              color={props.color}
              bgc={props.backgroundColor}
              setColor={props.setColor}
              setBgc={props.setBgc}
            />
          ))}
        </div>
        <ViewField color={props.color} bgc={props.backgroundColor} />
      </div>
    </div>
  );
};
const mstp = (state) => ({
  sliders: state.ui.sliders,
  mode: state.sliders.mode,
  color: state.sliders.color,
  backgroundColor: state.sliders.backgroundColor,
});

export const SlidersCont = connect(mstp, {
  setMode,
  setColor,
  setBgc,
})(Sliders);
