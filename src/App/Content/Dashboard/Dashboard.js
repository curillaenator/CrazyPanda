import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button } from "../../Common/Button/Button";
import {
  showPage,
  dashboardInit,
  showSortedPage,
} from "../../../Redux/Reducers/appReducer";

import arrow from "../../../Assets/Icons/arrow.png";
import styles from "./dashboard.module.scss";

const DashboardControls = ({ params, dataSorted, showPage }) => {
  const totalPgs = Math.ceil(dataSorted.length / params.pageSize);

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
      <div className={styles.filter}></div>
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

const DashboardHead = ({ dashboard, showSortedPage, isDashboardSortedBy }) => {
  const [carrierOpt, setCarrierOpt] = useState("increase");
  const [priceOpt, setpPriceOpt] = useState("increase");

  const sortHelper = (colName, localState, setLocalState) => {
    showSortedPage(colName, localState);
    setLocalState(localState === "decrease" ? "increase" : "decrease");
  };

  const sortHandler = (e) => {
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
          onClick={sortHandler}
        >
          <h3>{item.title}</h3>
          {isDashboardSortedBy === item.name && (
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
        dataSorted={props.dataSorted}
        showPage={props.showPage}
      />
      <DashboardHead
        dashboard={props.dashboard}
        showSortedPage={props.showSortedPage}
        isDashboardSortedBy={props.isDashboardSortedBy}
      />
      <DashboardList dataToShow={props.dataToShow} />
    </div>
  );
};

const mstp = (state) => ({
  isDashboardInit: state.app.isDashboardInit,
  isDashboardSortedBy: state.app.isDashboardSortedBy,
  dataSorted: state.app.dataSorted,
  dataToShow: state.app.dataToShow,
  dashboard: state.ui.dashboard,
  pageSize: state.app.pageSize,
  params: state.app.dashboardParams,
});

export const DashboardCont = connect(mstp, {
  showPage,
  showSortedPage,
  dashboardInit,
})(Dashboard);
