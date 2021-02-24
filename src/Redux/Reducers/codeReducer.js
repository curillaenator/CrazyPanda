import polinomials from "../../CodeTasks/Polinomials.txt";
import numbers from "../../CodeTasks/Numbers.txt";
const DUMMY = "codeRedicer/DUMMY";

const initialState = {
  cases: [
    {
      title: "Преобразование полиномиальных уравнений",
      description:
        'Следующий код принимает в себя полиномиальное уравнение (многочлен) вида "-a+5ab+3a-c-2a" и приводит его к упрощенному виду "-c+5ab" так, что переменные в приведенном уравнении упорядочены по алфавиту, а так же по количеству переменных в полиномиале. ',
      code: polinomials,
    },
    {
      title: "Поиск чисел по заданным параметрам",
      description: "",
      code: numbers,
    },
  ],
};

export const code = (state = initialState, action) => {
  switch (action.type) {
    case DUMMY:
      return { ...state };
    default:
      return state;
  }
};
