import data from "../../flights.json";
const INITIALIZE = "appReducer/INITIALIZE";
const SET_QUANT = "appReducer/SET_QUANT";
const SET_PAGE = "appReducer/SET_PAGE";
const SET_DATATOSHOW = "appReducer/SET_DATATOSHOW";
const DASHBOARD_INIT = "appReducer/DASHBOARD_INIT";

const initialState = {
  isInitialized: false,
  data: [
    ...data.result.bestPrices.ONE_CONNECTION.bestFlights,
    ...data.result.bestPrices.DIRECT.bestFlights,
  ],
  dataToShow: [],
  isDashboardInit: false,
  dashboardParams: {
    currentPage: 1,
    pageSize: 50,
    pQuant: 3,
    Q: 0,
  },
};

export const app = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE:
      return { ...state, isInitialized: true };
    case DASHBOARD_INIT:
      return { ...state, isDashboardInit: true };
    case SET_QUANT:
      return {
        ...state,
        dashboardParams: {
          ...state.dashboardParams,
          Q: action.Q,
        },
      };
    case SET_PAGE:
      return {
        ...state,
        dashboardParams: {
          ...state.dashboardParams,
          currentPage: action.page,
        },
      };
    case SET_DATATOSHOW:
      return { ...state, dataToShow: action.data };
    default:
      return state;
  }
};

// ACTIONs

// const isInitialize = () => ({ type: INITIALIZE });
export const setQuant = (Q) => ({ type: SET_QUANT, Q });
export const setPage = (page) => ({ type: SET_PAGE, page });
const dataToShow = (data) => ({ type: SET_DATATOSHOW, data });
const isDashboardInit = () => ({ type: DASHBOARD_INIT });

//THUNKs

const pageFilter = (data, pSize, page) => {
  return data.filter((_, i) => i >= pSize * (page - 1) && i < page * pSize);
};

export const dashboardInit = (data, pSize) => (dispatch) => {
  dispatch(dataToShow(pageFilter(data, pSize, 1)));
  dispatch(isDashboardInit());
};

export const showPage = (data, newQ, page, pSize) => (dispatch) => {
  dispatch(setQuant(newQ));
  dispatch(setPage(page));
  dispatch(dataToShow(pageFilter(data, pSize, page)));
};
