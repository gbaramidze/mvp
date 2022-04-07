
import styles from "./style.module.css"

const Container = ({children}) => (
	<div className={styles.container}>
		{children}
	</div>
)
export default Container