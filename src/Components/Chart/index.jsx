import {ResponsivePie} from '@nivo/pie'
import {memo} from "react";
import styles from "./style.module.css";

const Chart = ({data}) => (
	<div className={styles.wrapper}>
		<div className={styles.chart}/>
		<ResponsivePie
			data={data}
			margin={{top: 80, right: 80, bottom: 80, left: 80}}
			innerRadius={0.5}
			padAngle={0.7}
			sortByValue={true}
			cornerRadius={3}
			activeOuterRadiusOffset={8}
			colors={{scheme: 'category10'}}
			borderWidth={1}
			borderColor={{
				from: 'color',
				modifiers: [
					[
						'darker',
						0.2
					]
				]
			}}
			enableArcLinkLabels={false}
			arcLinkLabel="value"
			arcLinkLabelsSkipAngle={10}
			arcLinkLabelsTextColor={{from: 'color', modifiers: []}}
			arcLinkLabelsThickness={2}
			arcLinkLabelsColor={{from: 'color', modifiers: []}}
			arcLabel={e => `${e.value.toFixed(2)}%`}
			arcLabelsSkipAngle={10}
			arcLabelsTextColor={{
				from: 'color',
				modifiers: [
					[
						'brighter',
						'3'
					]
				]
			}}

			defs={[
				{
					id: 'dots',
					type: 'patternDots',
					background: 'inherit',
					color: 'rgba(255, 255, 255, 0.3)',
					size: 4,
					padding: 1,
					stagger: true
				},
				{
					id: 'lines',
					type: 'patternLines',
					background: 'inherit',
					color: 'rgba(255, 255, 255, 0.3)',
					rotation: -45,
					lineWidth: 6,
					spacing: 10
				}
			]}
			fill={[
				{
					match: {
						id: 'ruby'
					},
					id: 'dots'
				},
				{
					match: {
						id: 'c'
					},
					id: 'dots'
				},
				{
					match: {
						id: 'go'
					},
					id: 'dots'
				},
				{
					match: {
						id: 'python'
					},
					id: 'dots'
				},
				{
					match: {
						id: 'scala'
					},
					id: 'lines'
				},
				{
					match: {
						id: 'lisp'
					},
					id: 'lines'
				},
				{
					match: {
						id: 'elixir'
					},
					id: 'lines'
				},
				{
					match: {
						id: 'javascript'
					},
					id: 'lines'
				}
			]}
			legends={[
				{
					anchor: 'top',
					direction: 'row',
					justify: false,
					translateX: 0,
					translateY: -62,
					itemsSpacing: 0,
					itemWidth: 100,
					itemHeight: 18,
					itemTextColor: '#999',
					itemDirection: 'left-to-right',
					itemOpacity: 1,
					symbolSize: 18,
					symbolShape: 'square',
					effects: [
						{
							on: 'hover',
							style: {
								itemTextColor: '#000'
							}
						}
					]
				}
			]}
		/>
	</div>
)

export default memo(Chart)
