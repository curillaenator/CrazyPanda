import data from "../../flights.json";

const SET_QUANT = "appReducer/SET_QUANT";
const SET_PAGE = "appReducer/SET_PAGE";
const SET_DATATOSHOW = "appReducer/SET_DATATOSHOW";
const SET_DATASORTED = "appReducer/SET_DATASORTED";
const SET_DATAFILTERED = "appReducer/SET_DATAFILTERED";
const SET_SORTPARAMS = "appReducer/SET_SORTPARAMS";
const SET_FILTERPARAMS = "appReducer/SET_FILTERPARAMS";
const DASHBOARD_INIT = "appReducer/DASHBOARD_INIT";

const initialState = {
  data: [
    ...data.result.bestPrices.ONE_CONNECTION.bestFlights,
    ...data.result.bestPrices.DIRECT.bestFlights,
  ],
  dataSorted: [],
  dataFiltered: [],
  dataToShow: [],
  isDashboardInit: false,
  dashboardFilterParams: {
    carrier: "",
  },
  dashboardSortParams: {
    sortBy: "default",
    option: "default",
  },
  dashboardParams: {
    currentPage: 1,
    pageSize: 50,
    pQuant: 3,
    curQuant: 0,
  },
};

export const app = (state = initialState, action) => {
  switch (action.type) {
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
    case SET_DATAFILTERED:
      return { ...state, dataFiltered: action.data };
    case SET_SORTPARAMS:
      return { ...state, dashboardSortParams: action.params };
    case SET_FILTERPARAMS:
      return { ...state, dashboardFilterParams: action.params };
    default:
      return state;
  }
};

// ACTIONs

const setQuant = (quant) => ({ type: SET_QUANT, quant });
const setPage = (page) => ({ type: SET_PAGE, page });
const dataToShow = (data) => ({ type: SET_DATATOSHOW, data });
const dataSorted = (data) => ({ type: SET_DATASORTED, data });
const dataFiltered = (data) => ({ type: SET_DATAFILTERED, data });
const setSortParams = (params) => ({ type: SET_SORTPARAMS, params });
const setFilterParams = (params) => ({ type: SET_FILTERPARAMS, params });
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

const dataFilter = (sorted, filterBy = "") => {
  return filterBy === ""
    ? sorted
    : sorted.filter((el) =>
        el.carrier.caption.toLowerCase().includes(filterBy.toLowerCase())
      );
};

export const dashboardInit = () => (dispatch, getState) => {
  const data = getState().app.data;
  const pSize = getState().app.dashboardParams.pageSize;
  const sorted = dataSorter(data);
  const filtered = dataFilter(sorted);
  dispatch(dataSorted(sorted));
  dispatch(dataFiltered(filtered));
  dispatch(dataToShow(pageFilter(filtered, pSize, 1)));
  dispatch(isDashboardInit());
};

export const showPage = (newQuant, page) => (dispatch, getState) => {
  const pSize = getState().app.dashboardParams.pageSize;
  const filtered = getState().app.dataFiltered;
  dispatch(setQuant(newQuant));
  dispatch(setPage(page));
  dispatch(dataToShow(pageFilter(filtered, pSize, page)));
};

export const handleFilterSort = (
  sortBy = "default",
  option = "default",
  filterData = ""
) => (dispatch, getState) => {
  const pSize = getState().app.dashboardParams.pageSize;
  const data = getState().app.data;
  const sorted = dataSorter(data, sortBy, option);
  const filtered = dataFilter(sorted, filterData);
  const sortParams = { ...getState().app.dashboardSortOptions };
  sortParams.sortBy = sortBy;
  sortParams.option = option;
  const filterParams = { ...getState().app.dashboardFilterParams };
  filterParams.carrier = filterData;
  dispatch(setSortParams(sortParams));
  dispatch(setFilterParams(filterParams));
  dispatch(dataSorted(sorted));
  dispatch(dataFiltered(filtered));
  dispatch(setQuant(0));
  dispatch(setPage(1));
  dispatch(dataToShow(pageFilter(filtered, pSize, 1)));
};
