import { createContext, useContext, useState } from 'react';
import AccordionContent from './AccordionContent';
import AccordionItem from './AccordionItem';
import AccordionTitle from './AccordionTitle';

const AccordionContext = createContext();

export const useAccordionContext = () => {
	const ctx = useContext(AccordionContext);

	if (!ctx) {
		throw new Error(
			'Accordion related components must be wrapped with Accordion'
		);
	}

	return ctx;
};
const Accordion = ({ children, className }) => {
	const [openItemId, setOpenItemId] = useState();

	// const openItem = (id) => {
	//     setOpenItemId(id);
	// }

	// const closeItem = () => {
	//     setOpenItemId(null);
	// }

	const toggleItem = (id) => {
		setOpenItemId((prevId) => (prevId === id ? null : id));
	};

	const contextValue = {
		openItemId: openItemId,
		// openItem,
		// closeItem,
		toggleItem,
	};

	return (
		<AccordionContext.Provider value={contextValue}>
			<ul className={className}>{children}</ul>
		</AccordionContext.Provider>
	);
};

export default Accordion;
Accordion.Item = AccordionItem;
Accordion.Item.Title = AccordionTitle;
Accordion.Item.Content = AccordionContent;
