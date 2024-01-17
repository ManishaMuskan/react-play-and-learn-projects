import {
	Form,
	useNavigate,
	useNavigation,
	useActionData,
	json,
	redirect,
} from 'react-router-dom';

import classes from './EventForm.module.css';

function EventForm({ method, event }) {
	const navigate = useNavigate();
	const navigation = useNavigation();
	// this is how the response returned by action will be caught and will be used to display errors
	const data = useActionData();

	const isSubmitting = navigation.state === 'submitting' ? 'submitting' : '';

	function cancelHandler() {
		navigate('..');
	}

	return (
		<Form method={method} className={classes.form}>
			{data && data.errors && (
				<ul>
					{Object.values(data.errors).map((error) => (
						<li key={error}>{error}</li>
					))}
				</ul>
			)}
			<p>
				<label htmlFor='title'>Title</label>
				<input
					id='title'
					type='text'
					name='title'
					required
					defaultValue={event ? event.title : ''}
				/>
			</p>
			<p>
				<label htmlFor='image'>Image</label>
				<input
					id='image'
					type='url'
					name='image'
					required
					defaultValue={event ? event.image : ''}
				/>
			</p>
			<p>
				<label htmlFor='date'>Date</label>
				<input
					id='date'
					type='date'
					name='date'
					required
					defaultValue={event ? event.date : ''}
				/>
			</p>
			<p>
				<label htmlFor='description'>Description</label>
				<textarea
					id='description'
					name='description'
					rows='5'
					required
					defaultValue={event ? event.description : ''}
				/>
			</p>
			<div className={classes.actions}>
				<button type='button' onClick={cancelHandler} disabled={isSubmitting}>
					Cancel
				</button>
				<button disabled={isSubmitting}>
					{isSubmitting ? 'Submitting' : 'Save'}
				</button>
			</div>
		</Form>
	);
}

export default EventForm;

export const action = async ({ request, params }) => {
	const method = request.method;
	let formData = await request.formData();

	const eventData = {
		title: formData.get('title'),
		image: formData.get('image'),
		date: formData.get('date'),
		description: formData.get('description'),
	};

	let url = 'http://localhost:8080/events';
	if (method === 'PATCH') {
		url = 'http://localhost:8080/events/' + params.eventId;
	}

	const response = await fetch(url, {
		method: method,
		headers: { 'content-type': 'application/json' },
		body: JSON.stringify(eventData),
	});

	// this is the status that is being returned by the server for validation errors, so in case if there is validation error it will be returned to the page which will later be caught by the page by using useActionData() hook and will be shown to the user instead of going down and showing an error page
	if (response.status === 422) {
		return response;
	}

	if (!response.ok) {
		throw json({ message: "couldn't save event" }, { status: 500 });
	}

	return redirect('/events');
};
