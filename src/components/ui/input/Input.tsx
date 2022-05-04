const Input = (props: {
  id: string;
  name: string;
  className: string;
  label?: string;
  value: string | number;
  isValid?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessages?: string[];
  config?: any;
}) => {
  return (
    <div className={props.className}>
      {props.label && <label htmlFor={props.id}>{props.label}</label>}
      <input
        id={props.id}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        {...props.config}
      />
      {!props.isValid &&
        props?.errorMessages &&
        props.errorMessages.length > 0 &&
        props.errorMessages.map((error, index) => <span key={index}>{error}</span>)}
    </div>
  );
};

export default Input;
