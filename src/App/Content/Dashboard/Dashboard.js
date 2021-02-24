import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button } from "../../Common/Button/Button";
import {
  showPage,
  dashboardInit,
  handleFilterSort,
} from "../../../Redux/Reducers/appReducer";

import arrow from "../../../Assets/Icons/arrow.png";
import glass from "../../../Assets/Icons/search.png";
import styles from "./dashboard.module.scss";

const DashboardFilter = ({
  handleFilterSort,
  dashboardSortParams,
  dashboardFilterParams,
}) => {
  const sortBy = dashboardSortParams.sortBy;
  const option = dashboardSortParams.option;
  const carrier = dashboardFilterParams.carrier;

  const searchHandler = (e) => handleFilterSort(sortBy, option, e.target.value);

  return (
    <div className={styles.filter}>
      <input
        type="text"
        onInput={searchHandler}
        placeholder="Найти перевозчика"
        value={carrier}
      />
      <img src={glass} alt="Поиск" />
    </div>
  );
};

const DashboardControls = ({
  params,
  dataFiltered,
  showPage,
  handleFilterSort,
  dashboardSortParams,
  dashboardFilterParams,
}) => {
  const totalPgs = Math.ceil(dataFiltered.length / params.pageSize);

  const pageSelector = (pageNum, newQuant = params.curQuant) =>
    showPage(newQuant, pageNum);

  const next = () => {
    const newQuant = params.curQuant + params.pQuant;
    newQuant < totalPgs && pageSelector(newQuant + 1, newQuant);
  };
  const prev = () => {
    const newQuant = params.curQuant - params.pQuant;
    newQuant >= 0 && pageSelector(newQuant + 1, newQuant);
  };

  let pages = new Array(params.pQuant)
    .fill(1)
    .filter((p, i) => p + i + params.curQuant <= totalPgs)
    .map((p, i) => p + i + params.curQuant);

  return (
    <div className={styles.controls}>
      <DashboardFilter
        handleFilterSort={handleFilterSort}
        dashboardSortParams={dashboardSortParams}
        dashboardFilterParams={dashboardFilterParams}
      />
      <div className={styles.pagination}>
        <Button
          width="60px"
          height="20px"
          title="пред"
          handler={prev}
          disabled={params.curQuant - params.pQuant < 0}
        />
        {pages.map((p) => (
          <Button
            key={p}
            width="20px"
            height="20px"
            title={p}
            activated={p === params.currentPage}
            handlerArgs={p}
            handler={pageSelector}
          />
        ))}
        <Button
          width="60px"
          height="20px"
          title="след"
          handler={next}
          disabled={params.curQuant + params.pQuant >= totalPgs}
        />
      </div>
    </div>
  );
};

const DashboardHead = ({
  dashboard,
  handleFilterSort,
  dashboardSortParams,
  dashboardFilterParams,
}) => {
  const [carrierOpt, setCarrierOpt] = useState("increase");
  const [priceOpt, setpPriceOpt] = useState("increase");

  const sortHelper = (colName, localState, setLocalState) => {
    handleFilterSort(colName, localState, dashboardFilterParams.carrier);
    setLocalState(localState === "decrease" ? "increase" : "decrease");
  };

  const sortOnClick = (e) => {
    e.target.textContent === "Перевозчик" &&
      sortHelper("carrier", carrierOpt, setCarrierOpt);
    e.target.textContent === "Цена" &&
      sortHelper("price", priceOpt, setpPriceOpt);
  };

  const arrowStyle = (itemName) => {
    if (
      (itemName === "carrier" && carrierOpt === "decrease") ||
      (itemName === "price" && priceOpt === "decrease")
    )
      return { transform: "rotate(0deg)" };
  };

  return (
    <div className={styles.head}>
      {dashboard.map((item) => (
        <div
          className={styles.item}
          style={{ width: item.width }}
          key={item.name}
          onClick={sortOnClick}
        >
          <h3>{item.title}</h3>
          {dashboardSortParams.sortBy === item.name && (
            <img src={arrow} alt="Сортировка" style={arrowStyle(item.name)} />
          )}
        </div>
      ))}
    </div>
  );
};

const DashboardList = ({ dataToShow }) => (
  <div className={styles.list}>
    {dataToShow.map((flight, i) => (
      <div className={styles.flight} key={i}>
        <div className={styles.carrier}>
          <img
            src={`http://pics.avs.io/100/30/${flight.carrier.uid}.png`}
            alt=""
          />
          <p>{flight.carrier.caption}</p>
        </div>
        <div className={styles.price}>
          {flight.price.amount} {flight.price.currency}
        </div>
      </div>
    ))}
  </div>
);

const Dashboard = ({ dashboardInit, ...props }) => {
  useEffect(() => dashboardInit(), [dashboardInit]);

  if (!props.isDashboardInit) return <h2>Загрузка...</h2>;

  return (
    <div className={styles.dashboard}>
      <DashboardControls
        params={props.params}
        dataFiltered={props.dataFiltered}
        showPage={props.showPage}
        dashboardSortParams={props.dashboardSortParams}
        dashboardFilterParams={props.dashboardFilterParams}
        handleFilterSort={props.handleFilterSort}
      />
      <DashboardHead
        dashboard={props.dashboard}
        dashboardSortParams={props.dashboardSortParams}
        dashboardFilterParams={props.dashboardFilterParams}
        handleFilterSort={props.handleFilterSort}
      />
      <DashboardList dataToShow={props.dataToShow} />
    </div>
  );
};

const mstp = (state) => ({
  isDashboardInit: state.app.isDashboardInit,
  dashboardSortParams: state.app.dashboardSortParams,
  dashboardFilterParams: state.app.dashboardFilterParams,
  dataFiltered: state.app.dataFiltered,
  dataToShow: state.app.dataToShow,
  dashboard: state.ui.dashboard,
  pageSize: state.app.pageSize,
  params: state.app.dashboardParams,
});

export const DashboardCont = connect(mstp, {
  showPage,
  handleFilterSort,
  dashboardInit,
})(Dashboard);
