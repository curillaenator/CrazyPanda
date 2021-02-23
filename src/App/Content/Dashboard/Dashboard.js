import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button } from "../../Common/Button/Button";

import {
  showPage,
  dashboardInit,
  showSortedPage,
} from "../../../Redux/Reducers/appReducer";

import styles from "./table.module.scss";

const DashboardHead = ({ params, dashboard, showSortedPage }) => {
  const [option, setOption] = useState("increase");
  const sortHandler = (e) => {
    // console.log(e.target.textContent);
    showSortedPage(e.target.textContent, option);
    setOption(option === "decrease" ? "increase" : "decrease");
  };
  return (
    <div className={styles.head}>
      {dashboard.map((item) => (
        <div
          className={styles.item}
          style={{ width: item.width }}
          key={item.name}
          value={item.name}
          onClick={sortHandler}
        >
          {item.title}
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
          <h3>{flight.carrier.caption}</h3>
        </div>
        <div className={styles.price}>
          {flight.price.amount} {flight.price.currency}
        </div>
      </div>
    ))}
  </div>
);

const DashboardControls = ({ params, data, showPage }) => {
  const totalP = Math.ceil(data.length / params.pageSize);

  const pageSelector = (pageNum, newQuant = params.curQuant) =>
    showPage(data, newQuant, pageNum, params.pageSize);

  const next = () => {
    const newQuant = params.curQuant + params.pQuant;
    newQuant < totalP && pageSelector(newQuant + 1, newQuant);
  };
  const prev = () => {
    const newQuant = params.curQuant - params.pQuant;
    newQuant >= 0 && pageSelector(newQuant + 1, newQuant);
  };

  const pages = new Array(params.pQuant)
    .fill(1)
    .filter((p, i) => p + i + params.curQuant <= totalP)
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
          disabled={params.curQuant + params.pQuant >= totalP}
        />
      </div>
    </div>
  );
};

const Dashboard = ({ dashboardInit, ...props }) => {
  const pSize = props.params.pageSize;
  const data = props.data;
  useEffect(() => dashboardInit(data, pSize), [dashboardInit, data, pSize]);

  if (!props.isDashboardInit) return <h2>Загрузка...</h2>;

  return (
    <div className={styles.dashboard}>
      <DashboardControls
        params={props.params}
        data={props.data}
        showPage={props.showPage}
      />
      <DashboardHead
        params={props.params}
        data={props.data}
        dashboard={props.dashboard}
        showSortedPage={props.showSortedPage}
      />
      <DashboardList dataToShow={props.dataToShow} />
    </div>
  );
};

const mstp = (state) => ({
  isDashboardInit: state.app.isDashboardInit,
  data: state.app.data,
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
