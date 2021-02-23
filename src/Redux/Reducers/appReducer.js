import data from "../../flights.json";
const INITIALIZE = "appReducer/INITIALIZE";

const initialState = {
  isInitialized: false,
  data: data,
};

export const app = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE:
      return { ...state, isInitialized: true };
    default:
      return state;
  }
};

// ACTIONs

const initialize = () => ({ type: INITIALIZE });

//THUNKs
