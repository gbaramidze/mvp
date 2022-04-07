import styles from "./style.module.css"
import Accordion from "../../../Components/Accordion";

import ReportTable from "../Table";
import {useEffect, useMemo, useState} from "react";
import NoResult from "../../../Components/NoResults";
import Chart from "../../../Components/Chart";


const Result = ({gateways, reports, projects, searchCriteria}) => {
	const [searchType, setSearchType] = useState(0);

	const getProjectName = useMemo(() => {
		return searchCriteria.projectId ? projects.data.filter(project => project.projectId === searchCriteria.projectId).map(project => project.name).join() : 'All Projects'
	}, [searchCriteria.projectId, projects])

	const getGatewayName = useMemo(() => {
		return searchCriteria.gatewayId ? gateways.data.filter(gateway => gateway.gatewayId === searchCriteria.gatewayId).map(gateway => gateway.name).join() : 'All Gateways'
	}, [searchCriteria.gatewayId, gateways])

	useEffect(() => {
		if (!searchCriteria.projectId && searchCriteria.gatewayId) {
			// all projects & one gateways
			setSearchType(1)
		} else if (searchCriteria.projectId && searchCriteria.gatewayId) {
			// one project & one gateway
			setSearchType(2)
		} else if (searchCriteria.projectId && !searchCriteria.gatewayId) {
			// one project & all gateways
			setSearchType(3)
		} else {
			// all results
			setSearchType(0)
		}
	}, [projects, gateways, searchCriteria])

	const filteredData = useMemo(() => {
		if (projects && projects.data && gateways && gateways.data && reports) {
			if (searchType === 3) {
				return gateways.data
			} else if (searchType === 2) {
				return projects.data.filter(project => project.projectId === searchCriteria.projectId)
			}
			return projects.data
		}
		return []
	}, [searchType, searchCriteria, projects, gateways, reports])

	const countValue = (id) => `TOTAL: ${reports.data
		.filter(project =>
			(project && project.projectId && project.projectId === id) ||
			project.gatewayId === id
		)
		.reduce((acc, project) => {
			return acc + project.amount;
		}, 0).toFixed(2)} USD`;

	const sumAllProjects = useMemo(() => {
		if (reports && reports.data) {
			return reports.data.reduce((acc, report) => acc + report.amount, 0)
		}
		return 0
	}, [reports])

	const chartData = useMemo(() => {
		const arrayData = (searchType === 3 ?
			gateways && reports && gateways.data :
			projects && reports && projects.data) || []
		return arrayData.map(arr => {
			const filteredArr = reports.data.filter(filter => filter.gatewayId === arr.gatewayId || filter.projectId === arr.projectId);
			const reportsLength = filteredArr.length;
			return filteredArr.reduce((acc, pr, index) => {
				acc.value = pr.amount + acc.value;
				acc.label = arr.name
				acc.id = arr.name
				// convert to % on last index
				if (reportsLength === index + 1) {
					const grandTotal = acc.value + pr.amount;
					acc.value = (grandTotal * 100) / sumAllProjects
				}
				return acc;
			}, {label: '', value: 0, id: ''})
		})
	}, [reports, projects, gateways, searchType, sumAllProjects])

	return (
		<>
			<div className={styles.container}>
				{
					!reports || !reports.data ? (
							<NoResult/>
						) :
						(
							<>
								<div className={`${styles.wrapper} ${(searchType !== 1 && searchType !== 3) ? styles.fullWidth : ''}`}>
									<div className={styles.title}>
										<div className={styles.project}>
											{getProjectName}
										</div>
										<div>
											{getGatewayName}
										</div>
									</div>
									{
										filteredData.map((project, index) => (
											<Accordion
												key={`${project.name}.${index}`}
												title={project.name}
												value={countValue(project.projectId || project.gatewayId)}
												onlyChildren={searchType === 2}
												open={(searchType === 1 || searchType === 3) && index === 0}
											>
												<ReportTable
													type={searchType}
													gateways={gateways.data}
													reports={reports}
												/>
											</Accordion>
										))
									}
								</div>
								{(searchType === 1 || searchType === 3) && (
									<div className={styles.chartWrapper}>
										<Chart data={chartData}/>
										<div className={styles.total}>
											{searchType === 3 ? "PROJECT" : "GATEWAY"} TOTAL: {sumAllProjects.toFixed(2)} USD
										</div>
									</div>
								)}
							</>
						)
				}
			</div>
			{
				(searchType === 0 || searchType === 2) && reports && (
					<div className={styles.total}>
						TOTAL: {sumAllProjects.toFixed(2)} USD
					</div>
				)
			}
		</>
	)
}

export default Result;