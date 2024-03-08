import React, { useState } from 'react';

const Counter = ({ initialValue }) => {
	const [counter, setCounter] = useState(initialValue ?? 0);

	const removeHandler = () => {
		if (counter > 0) {
			setCounter((prevCounter) => prevCounter - 1);
		} else {
			setCounter(0);
		}
	};

	return (
		<div className='counter'>
			<h1>Awesome Counter</h1>
			<div className='counter-actions'>
				<button name='remove' onClick={removeHandler}>
					Remove
				</button>
				<span>{counter}</span>
				<button
					name='add'
					onClick={() => setCounter((prevCounter) => prevCounter + 1)}>
					Add
				</button>
			</div>
		</div>
	);
};

export default Counter;
