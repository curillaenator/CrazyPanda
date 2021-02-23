import { connect } from "react-redux";

import styles from "./header.module.scss";

const AuthorInfo = ({ author, authorName, authorInfo }) => (
  <div className={styles.author}>
    <div className={styles.info}>
      <h2>{authorName}</h2>
      <p>{authorInfo}</p>
    </div>
    <img src={author} alt={authorName} />
  </div>
);

const Header = ({ title, logo, author, authorName, authorInfo }) => {
  return (
    <header className={styles.header}>
      <img src={logo} alt={title} />
      <AuthorInfo
        author={author}
        authorName={authorName}
        authorInfo={authorInfo}
      />
    </header>
  );
};

const mstp = (state) => ({
  logo: state.ui.header.logo,
  title: state.ui.header.title,
  author: state.ui.header.author,
  authorName: state.ui.header.authorName,
  authorInfo: state.ui.header.authorInfo,
});

export const HeaderConnect = connect(mstp, {})(Header);
