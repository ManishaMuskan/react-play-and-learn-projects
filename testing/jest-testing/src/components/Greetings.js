import React, { useState } from 'react';

const Greetings = () => {
	const [changedText, setChangedText] = useState();

	return (
		<div>
			<h3>Hello world</h3>
			{!changedText && <p>It's good to see you!</p>}
			{changedText && <p>text changed, Thank you!</p>}
			<button
				onClick={() => {
					setChangedText(true);
				}}>
				Change text!
			</button>
		</div>
	);
};

export default Greetings;
