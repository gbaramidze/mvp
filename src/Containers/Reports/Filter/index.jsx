import Select from "../../../Components/Select";
import Datepicker from "../../../Components/Datepicker";
import Button from "../../../Components/Button";
import React,{useState} from "react";

const Filter = ({
  searchCriteria,
  setSearchCriteria,
  projects,
  gateways,
	setInit
}) => {
	const [localCriteria, setLocalCriteria] = useState(searchCriteria);
	const handleProject = e => {
		setLocalCriteria({
			...localCriteria,
			projectId: e.target.value
		})
	}

	const handleGateways = e => {
		setLocalCriteria({
			...localCriteria,
			gatewayId: e.target.value
		})
	}

	const handleDateFrom = value => {
		setLocalCriteria({
			...localCriteria,
			from: new Date(value)
		})
	}

	const handleDateTo = value => {
		setLocalCriteria({
			...localCriteria,
			to: new Date(value)
		})
	}

	const generateReport = () => {
		setInit(true)
		setSearchCriteria(localCriteria);
	}

	return (
		<div>
			<Select onChange={handleProject} value={localCriteria.projectId}>
				<option value="">All Projects</option>
				{
					projects && projects.data && projects.data.map(project => (
						<option value={project.projectId} key={Math.random()}>
							{project.name}
						</option>
					))
				}
			</Select>
			<Select onChange={handleGateways} value={localCriteria.gatewayId}>
				<option value="">All Gateways</option>
				{
					gateways && gateways.data && gateways.data.map(gateway => (
						<option value={gateway.gatewayId}  key={Math.random()}>
							{gateway.name}
						</option>
					))
				}
			</Select>
			<Datepicker
				placeholder="From date"
				onChange={handleDateFrom}
				selected={localCriteria.from}
			/>
			<Datepicker
				placeholder="To date"
				onChange={handleDateTo}
				selected={localCriteria.to}
				minDate={localCriteria.from}
			/>
			<Button onClick={generateReport}>
				Generate report
			</Button>
		</div>
	)
}

export default Filter;