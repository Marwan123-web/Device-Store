import { useTranslation } from "react-i18next";

const Button = ({
  classes,
  label,
  ButtonFun,
  children,
}: {
  classes: string;
  label?: string;
  ButtonFun?: Function;
  children?: any;
}) => {
  const { t } = useTranslation("common");

  const runButtonFun = () => {
    if (ButtonFun) ButtonFun();
  };
  return (
    <button className={classes} onClick={() => runButtonFun()}>
      {label && t(label)}
      {!label && children}
    </button>
  );
};

export default Button;
