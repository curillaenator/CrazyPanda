import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import styles from "./aside.module.scss";

const MenuItem = ({ item }) => {
  return (
    <NavLink
      to={item.path}
      className={styles.item}
      activeClassName={styles.itemActive}
    >
      {item.icon}
      <p>{item.name}</p>
    </NavLink>
  );
};

const Aside = ({ menu }) => {
  console.log(menu);
  return (
    <aside className={styles.aside}>
      <div className={styles.menu}>
        {menu.map((m) => (
          <MenuItem title={m.name} key={m.name} item={m} />
        ))}
      </div>
    </aside>
  );
};

const mstp = (state) => ({
  menu: state.ui.aside.menu,
});

export const AsideConnect = connect(mstp, {})(Aside);
