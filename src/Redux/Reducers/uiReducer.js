import logo from "../../Assets/Icons/logo.png";
import author from "../../Assets/Images/Arturov.jpg";

const icons = {
  code: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M23 10.826v2.349c-1.562 0-3 1.312-3 2.857 0 2.181 1.281 5.968-6 5.968v-2.002c4.917 0 3.966-1.6 3.966-3.967 0-2.094 1.211-3.5 2.278-4.031-1.067-.531-2.278-1.438-2.278-3.312 0-2.372.94-4.692-3.966-4.686v-2.002c7.285 0 6 4.506 6 6.688 0 1.544 1.438 2.138 3 2.138zm-19-2.138c0-2.182-1.285-6.688 6-6.688v2.002c-4.906-.007-3.966 2.313-3.966 4.686 0 1.875-1.211 2.781-2.278 3.312 1.067.531 2.278 1.938 2.278 4.031 0 2.367-.951 3.967 3.966 3.967v2.002c-7.281 0-6-3.787-6-5.969 0-1.545-1.438-2.857-3-2.857v-2.349c1.562.001 3-.593 3-2.137z" />
    </svg>
  ),
  sheets: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M20 19h-4v-4h4v4zm-6-10h-4v4h4v-4zm6 0h-4v4h4v-4zm-12 6h-4v4h4v-4zm16-14v22h-24v-22h24zm-2 6h-20v14h20v-14zm-8 8h-4v4h4v-4zm-6-6h-4v4h4v-4z" />
    </svg>
  ),
  sliders: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M6 16h-6v-3h6v3zm-2-5v-10h-2v10h2zm-2 7v5h2v-5h-2zm13-7h-6v-3h6v3zm-2-5v-5h-2v5h2zm-2 7v10h2v-10h-2zm13 3h-6v-3h6v3zm-2-5v-10h-2v10h2zm-2 7v5h2v-5h-2z" />
    </svg>
  ),
};

const initialState = {
  aside: {
    menu: [
      { name: "Код", icon: icons.code, path: "/code" },
      { name: "Таблица", icon: icons.sheets, path: "/table" },
      { name: "Слайдеры", icon: icons.sliders, path: "/slider" },
    ],
  },
  header: {
    title: "CrazyPanda",
    logo,
    author,
    authorName: "Артуров Кирилл",
    authorInfo: "талантливый фронтенд разработчик",
  },
  dashboard: [
    { name: "carrier", title: "Перевозчик", width: "calc(100% - 220px)" },
    { name: "price", title: "Цена", width: "220px" },
  ],
};

export const ui = (state = initialState) => state;
