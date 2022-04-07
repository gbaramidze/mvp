import styles from "./style.module.css";
import {useState} from "react";

const Accordion = ({children, title, value, onlyChildren, open}) => {
	const [isOpen, setIsOpen] = useState(open || false);

	const toggleAccordion = () => {
		setIsOpen(!isOpen)
	};

	return (
		!onlyChildren ? (
			<div className={styles.accordion}>
				<div className={styles.header} onClick={toggleAccordion} >
					<div>
						{title}
					</div>
					<div>
						{value}
					</div>
				</div>
				<div className={`${styles.content} ${!isOpen ? styles.closed : ''}`}>
					{children}
				</div>
			</div>
		) : (
			<div className={styles.content}>
				{children}
			</div>
		)
	)
}

export default Accordion