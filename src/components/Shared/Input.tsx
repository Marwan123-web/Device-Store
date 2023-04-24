const Input = ({
  type = "text",
  id,
  name,
  placeholder = "Input Filed",
  required = false,
  label,
  children,
  changeFun,
  value = "",
  classes,
}: {
  classes?: string;
  type?: string;
  id?: string;
  name?: string;
  placeholder?: string;
  required?: boolean;
  label?: string;
  children?: any;
  changeFun?: Function;
  value?: string | number;
}) => {
  const RunChangeFun = (e: any) => {
    if (changeFun) {
      changeFun(e.target.value);
    }
  };
  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      {children}
      <input
        type={type}
        className={classes}
        id={id}
        name={name}
        placeholder={placeholder}
        required={required}
        onChange={(e) => RunChangeFun(e)}
        value={value}
      />
    </div>
  );
};

export default Input;
