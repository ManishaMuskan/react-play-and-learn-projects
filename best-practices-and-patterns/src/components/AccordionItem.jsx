import { createContext, useContext } from 'react';

const AccordionItemContext = createContext();

export const useAccordionItemContext = () => {
	const ctx = useContext(AccordionItemContext);

	if (!ctx) {
		throw new Error(
			'Accordion-item-related components must be wrapped under Accordion.Item'
		);
	}

	return ctx;
};

const AccordionItem = ({ id, className, children }) => {
	const contextValue = { id };

	return (
		<AccordionItemContext.Provider value={contextValue}>
			<li className={className}>{children}</li>
		</AccordionItemContext.Provider>
	);
};

export default AccordionItem;
