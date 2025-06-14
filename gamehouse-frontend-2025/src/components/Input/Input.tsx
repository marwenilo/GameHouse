import styles from "./Input.module.css";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

const Input = (props: Props) => <input className={styles.input} {...props} />;

export default Input;
