import React from 'react';
import { useAccordionContext } from './Accordion';
import { useAccordionItemContext } from './AccordionItem';

const AccordionContent = ({ className, children }) => {
	const { openItemId } = useAccordionContext();
	const { id } = useAccordionItemContext();

	const isOPen = openItemId === id;

	return (
		<div
			className={
				isOPen ? `${className ?? ''}  open` : `${className ?? ''}  close`
			}>
			{children}
		</div>
		/*by adding and removing class open we are opening or closing the accordion, when is id matches it adds open class otherwise the close class*/
	);
};

export default AccordionContent;
