
import styles from "./style.module.css";

const PageHeader = ({header, subheader, placement}) => (
	<div className={`${styles.pageHeader} ${styles[placement]}`}>
		<h1 className={styles.header}>{header}</h1>
		<h2 className={styles.subheader}>{subheader}</h2>
	</div>
)

export default PageHeader