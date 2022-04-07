import {memo, useEffect, useState} from "react";
import PageHeader from "../../Components/PageHeader";
import Container from "../../Components/Container";
import Filter from "./Filter";
import Result from "./Result";
import callApi from "../../callApi";
import Loader from "../../Components/Loader";
import styles from "./style.module.css";

const Reports = () => {
	const [init, setInit] = useState(false)
	const [searchCriteria, setSearchCriteria] = useState({
		from: '',
		to: '',
		projectId: '',
		gatewayId: '',
	})
	const [loading, setLoading] = useState(false);

	const [projects, setProjects] = useState();
	const [gateways, setGateways] = useState();
	const [reports, setReports] = useState();

	useEffect( () => {
		const fetchData = async () => {
			setProjects(await callApi("/projects"))
			setGateways(await callApi("/gateways"))
		}

		const fetchReports = async () => {
			setLoading(true)
			setReports(await callApi("/report", {
				body: JSON.stringify(searchCriteria),
				method: "POST",
				headers: {
					'Accept': 'application/json, text/plain, */*',
					'Content-Type': 'application/json'
				}
			}))
			setLoading(false)
		}

		fetchData()
		if (init && searchCriteria) {
			fetchReports()
		}
	}, [searchCriteria, init])

	return (
		<Loader delay={300} loading={loading}>
			<Container>
				<div className={styles.wrapper}>
					<PageHeader
						header={"Reports"}
						subheader={"Easily generate a report of your transactions"}
					/>
					<Filter
						searchCriteria={searchCriteria}
						setSearchCriteria={setSearchCriteria}
						setInit={setInit}
						projects={projects}
						gateways={gateways}
					/>
				</div>
				<Result
					projects={projects}
					gateways={gateways}
					reports={reports}
					searchCriteria={searchCriteria}
				/>
			</Container>
		</Loader>
	)
};

export default memo(Reports);