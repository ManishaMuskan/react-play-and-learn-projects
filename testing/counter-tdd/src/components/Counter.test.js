import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Counter from './Counter';

describe('Counter Component', () => {
	test("it displays 'Awesome Counter'", () => {
		//arrange
		render(<Counter />);
		const text = screen.getByText('Awesome Counter');

		//act
		//assert
		expect(text).toBeInTheDocument();
	});

	test('it should have correct positive initial value when set to initial value = 7', () => {
		//arrange
		const initialValue = 7;
		render(<Counter initialValue={initialValue} />);
		const text = screen.queryByText(initialValue);

		//act
		//assert
		expect(text).toBeVisible();
	});

	test('it should have a default initial value of 0', () => {
		//arrange
		render(<Counter />);
		const text = screen.queryByText(0);
		//act
		//assert
		expect(text).toBeVisible();
	});

	test('it should increase the counter value to 2 if initialValue = 1 and "Add" button is clicked once', async () => {
		//arrange
		render(<Counter initialValue={1} />);
		//act
		const addButton = screen.getByText('Add');
		await userEvent.click(addButton);
		const counterValue = screen.queryByText(2);
		//assert
		expect(counterValue).toBeVisible();
	});

	test('it should increase the counter value to 5 if initialValue = 2 and "Add" button is clicked thrice', async () => {
		//arrange
		render(<Counter initialValue={2} />);
		//act
		const addButton = screen.getByText('Add');
		await userEvent.click(addButton);
		await userEvent.click(addButton);
		await userEvent.click(addButton);
		const counterValue = screen.queryByText(5);
		//assert
		expect(counterValue).toBeVisible();
	});

	test('it should decrease the counter value to 4 if initialValue = 6 and "REMOVE" button is clicked twice', async () => {
		//arrange
		render(<Counter initialValue={6} />);
		//act
		const removeButton = screen.getByText('Remove');
		await userEvent.click(removeButton);
		await userEvent.click(removeButton);
		const counterValue = screen.queryByText(4);
		//assert
		expect(counterValue).toBeVisible();
	});

	test('it should not allow a negative counter if "REMOVE" button is clicked thrice and initial value is 1', async () => {
		//arrange
		render(<Counter initialValue={1} />);
		//act
		const removeButton = screen.getByText('Remove');
		await userEvent.click(removeButton);
		await userEvent.click(removeButton);
		await userEvent.click(removeButton);
		const counterValue = screen.queryByText(0);
		//assert
		expect(counterValue).toBeVisible();
	});
});
