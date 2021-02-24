import { Route } from "react-router-dom";
import { DashboardCont } from "./Dashboard/Dashboard";
import { SlidersCont } from "./Sliders/Sliders";

const Content = () => {
  return (
    <>
      <Route path="/" render={() => {}} />
      <Route path="/dashboard" render={() => <DashboardCont />} />
      <Route path="/sliders" render={() => <SlidersCont />} />
    </>
  );
};
export default Content;
