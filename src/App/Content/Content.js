import { Route } from "react-router-dom";
import { CodeCont } from "./Code/Code";
import { DashboardCont } from "./Dashboard/Dashboard";
import { SlidersCont } from "./Sliders/Sliders";

const Content = () => {
  return (
    <>
      <Route path="/code" render={() => <CodeCont />} />
      <Route path="/dashboard" render={() => <DashboardCont />} />
      <Route path="/sliders" render={() => <SlidersCont />} />
    </>
  );
};
export default Content;
