import s from "./button.module.scss";

export const Button = ({ width, height, ...props }) => {
  const handleClick = () =>
    props.handler &&
    props.handler(props.handlerArgs ? props.handlerArgs : null);

  const btnStyles = `
  ${s.button} ${props.activated && s.activated} ${props.disabled && s.disabled}
  `;

  return (
    <button
      className={btnStyles}
      style={{ width, height }}
      onClick={handleClick}
      disabled={props.disabled}
    >
      {props.title}
    </button>
  );
};
