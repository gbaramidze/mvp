import styles from "./style.module.css";

const Select = ({children, value, ...rest}) => (
	<select className={styles.select} {...rest} value={value}>
		{children}
	</select>
)

export default Select