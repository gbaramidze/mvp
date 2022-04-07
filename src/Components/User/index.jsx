import styles from "./style.module.css";

const User = ({children}) => children;

User.Avatar = () => (
	<span className={styles.avatar}>
		JD
	</span>
)

User.Name = () => (
	<span className={styles.name}>
		John Doe
	</span>
)

export default User