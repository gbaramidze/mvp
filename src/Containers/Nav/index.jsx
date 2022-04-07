
import styles from "./style.module.css";
import Logo from "../../Components/Logo";
import User from "../../Components/User";
import Switcher from "../../Components/Switcher";

const Nav = () => {
	return (
		<header className={styles.nav}>
			<Logo />
			<Switcher />
			<div className={styles.right}>
				<User>
					<User.Avatar/>
					<User.Name />
				</User>
			</div>
		</header>
	)
}

export default Nav