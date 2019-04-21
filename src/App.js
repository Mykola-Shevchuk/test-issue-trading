import React, {Component} from 'react';
import Row from './components/Row';
import Checkbox from './components/Checkbox';
import trading from './fixtures/trading-hours';
import {rangeHours} from "./util";
import './App.css';

class App extends Component {
	state = {
		filterActive: false,
		filteredData: [],
		data: []
	};

	onChange = () => {
		this.onFilter();

		this.setState({
			filterActive: !this.state.filterActive
		});
	};

	onFilter = () => {
		const filteredData = this.state.data.filter(item => item.status);

		this.setState({
			filteredData
		})
	};

	componentDidMount() {
		const data = trading.map((item, index) => {
			return {
				id: item.instrumentID,
				name: item.name,
				status: trading[index].tradingHours.filter(hour => rangeHours(hour.from, hour.to)).length
			};
		});

		this.setState({
			data
		})
	}

	render() {
		const {filterActive, filteredData, data} = this.state;
		const tradingData = filterActive ? filteredData : data;

		return (
			<div className="table-container">
				<Checkbox onChange={this.onChange}/>
				<table className="table">
					<thead>
					<tr>
						<td>ID</td>
						<td>Name</td>
						<td>Status</td>
					</tr>
					</thead>
					<tbody>
					<Row data={tradingData} filter={this.state.filterActive}/>
					</tbody>
				</table>
			</div>
		);
	}
}

export default App;
