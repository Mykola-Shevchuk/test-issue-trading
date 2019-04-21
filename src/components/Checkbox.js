import React from 'react';

const CheckBox = ({onChange}) => {
	return (
		<h3>
			<span>Show only Open:</span>
			<input type="checkbox" onChange={onChange}/>
		</h3>
	);
};

export default CheckBox;
