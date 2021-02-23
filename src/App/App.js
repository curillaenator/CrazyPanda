import { BrowserRouter } from "react-router-dom";
import { HeaderConnect } from "./Header/Header";
import { AsideConnect } from "./Aside/Aside";
import Content from "./Content/Content";

import styles from "./app.module.scss";

function App() {
  return (
    <BrowserRouter>
      <div className={styles.container}>
        <HeaderConnect />
        <div className={styles.body}>
          <AsideConnect />
          <Content />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
