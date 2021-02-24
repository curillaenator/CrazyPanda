import data from "../../flights.json";
const INITIALIZE = "appReducer/INITIALIZE";
const SET_QUANT = "appReducer/SET_QUANT";
const SET_PAGE = "appReducer/SET_PAGE";
const SET_DATATOSHOW = "appReducer/SET_DATATOSHOW";
const SET_DATASORTED = "appReducer/SET_DATASORTED";
const SET_ISSORTEDBY = "appReducer/SET_ISSORTEDBY";
const DASHBOARD_INIT = "appReducer/DASHBOARD_INIT";

const initialState = {
  data: [
    ...data.result.bestPrices.ONE_CONNECTION.bestFlights,
    ...data.result.bestPrices.DIRECT.bestFlights,
  ],
  dataSorted: [],
  dataToShow: [],
  isDashboardInit: false,
  isDashboardSortedBy: null,
  dashboardParams: {
    currentPage: 1,
    pageSize: 50,
    pQuant: 3,
    curQuant: 0,
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
          curQuant: action.quant,
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
    case SET_DATASORTED:
      return { ...state, dataSorted: action.data };
    case SET_ISSORTEDBY:
      return { ...state, isDashboardSortedBy: action.sortBy };
    default:
      return state;
  }
};

// ACTIONs

const setQuant = (quant) => ({ type: SET_QUANT, quant });
const setPage = (page) => ({ type: SET_PAGE, page });
const dataToShow = (data) => ({ type: SET_DATATOSHOW, data });
const dataSorted = (data) => ({ type: SET_DATASORTED, data });
const sortedBy = (sortBy) => ({ type: SET_ISSORTEDBY, sortBy });
const isDashboardInit = () => ({ type: DASHBOARD_INIT });

//THUNKs

const pageFilter = (data, pSize, currPage) =>
  data.filter((_, i) => i >= pSize * (currPage - 1) && i < currPage * pSize);

const dataSorter = (data, sortBy = "default", option = "default") => {
  const unsorted = data.map((el) => el);
  const carrier = (c) => c.carrier.caption.split(" ").join("").toLowerCase();
  const price = (p) => +p.price.amount;
  const methods = {
    carrierincrease: () =>
      unsorted.sort((el1, el2) => carrier(el1) < carrier(el2) && -1),
    carrierdecrease: () =>
      unsorted.sort((el1, el2) => carrier(el1) > carrier(el2) && -1),
    priceincrease: () => unsorted.sort((el1, el2) => price(el1) - price(el2)),
    pricedecrease: () => unsorted.sort((el1, el2) => price(el2) - price(el1)),
    defaultdefault: () => unsorted,
  };
  return methods[`${sortBy}${option}`]();
};

export const dashboardInit = () => (dispatch, getState) => {
  const data = getState().app.data;
  const pSize = getState().app.dashboardParams.pageSize;
  const sorted = dataSorter(data);
  dispatch(dataSorted(sorted));
  dispatch(dataToShow(pageFilter(sorted, pSize, 1)));
  dispatch(isDashboardInit());
};

export const showPage = (newQuant, page) => (dispatch, getState) => {
  const pSize = getState().app.dashboardParams.pageSize;
  const sorted = getState().app.dataSorted;
  dispatch(setQuant(newQuant));
  dispatch(setPage(page));
  dispatch(dataToShow(pageFilter(sorted, pSize, page)));
};

export const showSortedPage = (sortBy, option) => (dispatch, getState) => {
  const pSize = getState().app.dashboardParams.pageSize;
  const data = getState().app.data;
  const sorted = dataSorter(data, sortBy, option);
  dispatch(sortedBy(sortBy));
  dispatch(dataSorted(sorted));
  dispatch(setQuant(0));
  dispatch(setPage(1));
  dispatch(dataToShow(pageFilter(sorted, pSize, 1)));
};
