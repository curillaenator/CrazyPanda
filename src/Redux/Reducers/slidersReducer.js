// const INITIALIZE = "sliderRedicer/INITIALIZE";
const SET_MODE = "sliderRedicer/SET_MODE";
const SET_COLOR = "sliderRedicer/SET_COLOR";
const SET_BACKGROUNDCOLOR = "sliderRedicer/SET_BACKGROUNDCOLOR";

const initialState = {
  mode: "color",
  color: {
    red: 240,
    green: 240,
    blue: 240,
  },
  backgroundColor: {
    red: 72,
    green: 0,
    blue: 242,
  },
};

export const sliders = (state = initialState, action) => {
  switch (action.type) {
    case SET_MODE:
      return { ...state, mode: action.mode };
    case SET_COLOR:
      return { ...state, color: action.rgb };
    case SET_BACKGROUNDCOLOR:
      return { ...state, backgroundColor: action.rgb };
    default:
      return state;
  }
};

// ACTIONs

export const setMode = (mode) => ({ type: SET_MODE, mode });
export const setColor = (rgb) => ({ type: SET_COLOR, rgb });
export const setBgc = (rgb) => ({ type: SET_BACKGROUNDCOLOR, rgb });
