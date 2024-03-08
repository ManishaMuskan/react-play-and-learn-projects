import React from 'react';
import { useAccordionContext } from './Accordion';
import { useAccordionItemContext } from './AccordionItem';

const AccordionTitle = ({ children }) => {
	const { toggleItem } = useAccordionContext();
	const { id } = useAccordionItemContext();

	return <h3 onClick={() => toggleItem(id)}>{children}</h3>;
};

export default AccordionTitle;
