import React, {Fragment} from 'react';


const Row = ({data}) => {
	const rows = data.map((item, index) =>
		<tr key={index}>
			<td>{item.id}</td>
			<td>{item.name}</td>
			<td>{item.status ? 'Open' : 'Close'}</td>
		</tr>
	);

	return (
		<Fragment>
			{rows}
		</Fragment>
	);

};

export default Row;
