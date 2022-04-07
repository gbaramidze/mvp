import Nav from "../Nav";
import Sidebar from "../../Components/Sidebar";
import Reports from "../Reports";
import Footer from "../Footer";
import styles from "./style.module.css";

const Index = () =>
	(
		<div className={styles.App}>
			<Nav/>
			<div style={{display: 'flex'}}>
				<Sidebar/>
				<Reports/>
			</div>
			<Footer/>
		</div>
	);

export default Index;
