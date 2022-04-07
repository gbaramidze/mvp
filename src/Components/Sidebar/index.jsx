
import styles from "./style.module.css";

const items = [
	"charts",
	"dashboard",
	"data",
	"reports",
	"logout",
]

const Sidebar = () => {
	return (
		<aside className={styles.sidebar}>
			{
				items.map(item => (
					<span key={item} className={styles.icon}>
						<img src={`./static/sidebar/${item}.png`} alt={item} />
					</span>
				))
			}
		</aside>
	)
}

export default Sidebar;