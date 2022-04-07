import {useEffect, useRef, useState} from "react";
import styles from "./style.module.css"

const MIN_TIME_MS = 500;

const Loader = ({delay, children, loading}) => {
	const [showLoading, setShowLoading] = useState(loading)
	const loadingStart = useRef();

	useEffect(() => {
		const calcRemainingMinLoadingTime = (loadingStart, now = new Date().getTime()) => {
			const pastTime = now - loadingStart;

			if (pastTime > delay && pastTime < MIN_TIME_MS) {
				return MIN_TIME_MS - pastTime;
			}
			return 0;
		};

		const startLoadingDelayed = () => {
			loadingStart.current = new Date().getTime();

			const timer = setTimeout(() => {
				if (loadingStart.current) {
					setShowLoading(true)
				}
			}, delay);

			return timer;
		};

		const stopLoadingAfterMinTime = (loadingStartMandatory) =>
			setTimeout(() => {
				loadingStart.current = undefined;
				setShowLoading(false)
			}, calcRemainingMinLoadingTime(loadingStartMandatory));

		if (loading) {
			const timer = startLoadingDelayed()
			return () => {
				clearTimeout(timer)
			}
		} else {
			if (loadingStart.current) {
				const timer = stopLoadingAfterMinTime(loadingStart.current);
				return () => {
					clearTimeout(timer);
				};
			}
		}

	}, [loading, delay]);


	return (
		<>
			{
				showLoading && (
					<div className={styles.wrapper}>
						<div className={styles.loader} />
					</div>
				)
			}
			{children}
		</>
	)
}

Loader.defaultProps = {
	delay: 100
}

export default Loader