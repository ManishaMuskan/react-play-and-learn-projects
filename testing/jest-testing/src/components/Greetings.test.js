import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Greetings from './Greetings';

describe('Greetings component', () => {
	test('renders "hello world"', () => {
		// arrange
		render(<Greetings />);
		const paraElement = screen.getByText(/hello world/i, { exact: false });

		// act
		//nothing...

		// assert
		expect(paraElement).toBeInTheDocument();
	});

	test('renders "good to see you" when button is NOT clicked', () => {
		// arrange
		render(<Greetings />);
		const paraElement = screen.getByText(/good to see you/i, { exact: false });

		// act
		//nothing...

		// assert
		expect(paraElement).toBeInTheDocument();
	});

	test('renders "text changed, Thank you!" when button is clicked', () => {
		// arrange
		render(<Greetings />);

		// act
		const buttonElement = screen.getByRole('button');
		userEvent.click(buttonElement);

		// assert
		const paraElement = screen.getByText('text changed, Thank you!', {
			exact: true,
		});
		expect(paraElement).toBeInTheDocument();
	});

	test('does not render "good to see you" when button is clicked', () => {
		// arrange
		render(<Greetings />);

		// act
		const buttonElement = screen.getByRole('button');
		userEvent.click(buttonElement);

		// assert
		const paraElement = screen.queryByText('good to see you', {
			exact: false,
		});
		expect(paraElement).not.toBeInTheDocument();
	});
});
