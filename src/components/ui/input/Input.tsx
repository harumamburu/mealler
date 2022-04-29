import styles from './Input.module.css';

const Input: React.FC<{
  label?: string,
  isValid?: boolean,
  input: any,}> = (props) => {
  return (
    <div className={`${styles.input} ${props.isValid ? '' : styles.invalid}`}>
      {props.label && <label htmlFor={props.input.id}>Amount</label>}
      <input id={props.input.id} {...props.input} />
    </div>
  );
};

export default Input;
