import { Route } from "react-router-dom";
import { CodeCont } from "./Code/Code";
import { DashboardCont } from "./Dashboard/Dashboard";
import { SlidersCont } from "./Sliders/Sliders";

const Welcome = () => {
  return (
    <div style={{ width: "100%", margin: "16px 0 0 16px" }}>
      <h2 style={{ marginBottom: "16px" }}>Добрый день!</h2>
      <p style={{ marginBottom: "8px" }}>
        Я джун, готовый достигать результатов в работе и развить свои навыки до
        необходимого уровня. Имею опыт написания SPA на React, поэтому выполнил
        Ваше тестовое задание в виде небольшого приложения, написанного на
        React.
      </p>
      <p style={{ marginBottom: "8px" }}>
        При написании применяю функциональный подход написания компонент,
        роyтинг, коннекты, хуки, стейт-менеджмент, REST, активно улучшаю свои
        знания, так как в текущий момент все свое время уделяю развитию себя как
        фронт энд разработчика. В базовых HTML, CSS (пишу на sass) хорошо
        ориентируюсь, есть опыт верстки по макетам в pixel-perfect.
      </p>
      <p style={{ marginBottom: "8px" }}>
        Люблю учиться, учусь быстро, Гугл - мой лучший друг! Знаю английский
        язык на разговорном уровне и стремлюсь улучшить и применить свои знания
        по назначению в команде профессионалов!
      </p>
      <p style={{ marginBottom: "8px" }}>Хорошего дня!</p>
      <p style={{ marginBottom: "8px" }}>Кирилл.</p>
    </div>
  );
};

const Content = () => {
  return (
    <>
      <Route exact path="/" render={() => <Welcome />} />
      <Route path="/code" render={() => <CodeCont />} />
      <Route path="/dashboard" render={() => <DashboardCont />} />
      <Route path="/sliders" render={() => <SlidersCont />} />
    </>
  );
};
export default Content;
