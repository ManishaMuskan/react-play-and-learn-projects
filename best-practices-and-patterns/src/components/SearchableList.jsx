import React, { useState, useRef } from 'react';

let searchTimer = null;

const SearchableList = ({ items, itemKeyFn, children }) => {
	const [searchTerm, setSearchTerm] = useState('');
	const lastChange = useRef(null);

	const searchResults = items.filter((item) =>
		JSON.stringify(item).toLowerCase().includes(searchTerm.toLowerCase())
	);

	const handleSearch = (event) => {
		if (lastChange.current) {
			clearTimeout(lastChange.current);
		}

		lastChange.current = setTimeout(() => {
			lastChange.current = null;
			setSearchTerm(event.target.value);
		}, 1000);
	};

	return (
		<div className='searchable-list'>
			<input type='search' placeholder='search' onChange={handleSearch}></input>
			<ul>
				{searchResults.map((item) => (
					<li key={itemKeyFn(item)}>{children(item)}</li>
				))}
			</ul>
		</div>
	);
};

export default SearchableList;
