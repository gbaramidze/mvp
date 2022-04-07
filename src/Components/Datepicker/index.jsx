import styles from "./style.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const Datepicker = ({placeholder, ...rest}) => (
	<span className={styles.datepickerWrapper}>
		<DatePicker
			className={styles.datepicker}
			placeholderText={placeholder}
			{...rest}
		/>
		<img
			src="/static/calendar.png"
			alt="calendar-icon"
			className={styles.icon}
		/>
	</span>
);


export default Datepicker