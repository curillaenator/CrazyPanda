import { Route } from "react-router-dom";
import { DashboardCont } from "./Dashboard/Dashboard";

const Content = () => {
  return (
    <>
      <Route path="/" render={() => {}} />
      <Route path="/table" render={() => <DashboardCont />} />
      <Route path="/" render={() => {}} />
    </>
  );
};
export default Content;
