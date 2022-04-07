
import styles from "./style.module.css"

const Button = ({children, ...rest}) => (
	<button
		className={styles.button}
		{...rest}
	>
		{children}
	</button>
)

export default Button;