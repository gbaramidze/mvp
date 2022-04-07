import PageHeader from "../PageHeader";
import styles from "./style.module.css"

const NoResult = () => (
	<div className={styles.wrapper}>
		<PageHeader
			header="No reports"
			subheader="Currently you have no data for the reports to be generated.
Once you start generating traffic through the Balance application
the reports will be shown."
			placement="center"
		/>
		<img src="/static/noreport.png" alt="no results"/>
	</div>
)

export default NoResult;