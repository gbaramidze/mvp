import React, {useCallback} from "react";
import styles from "./style.module.css";

const ReportTable = ({reports, gateways, type}) => {
	const getGateWayName = useCallback((id) =>
			gateways
				.filter(gateway => gateway.gatewayId === id)
				.map(gateway => gateway.name)
				.join()
		, [gateways])

	const convertDate = useCallback((date) => new Date(date).toLocaleDateString(),[]);

	return (
		<>
			<table className={styles.table}>
				<thead>
				<tr>
					<th>
						Date
					</th>
					{
						type === 0 && (
							<th>
								Gateway
							</th>
						)
					}
					<th align="center">
						Transaction ID
					</th>
					<th align="right">
						Amount
					</th>
				</tr>
				</thead>
				<tbody>
				{reports.data.map(report => (
					<tr key={Math.random()}>
						<td>
							{convertDate(report.created)}
						</td>
						{
							type === 0 && (
								<td>
									{getGateWayName(report.gatewayId)}
								</td>
							)
						}
						<td align="center">
							{report.gatewayId}
						</td>
						<td align="right">
							{report.amount} USD
						</td>
					</tr>
				))}
				</tbody>
			</table>
		</>

	)
}

export default ReportTable;