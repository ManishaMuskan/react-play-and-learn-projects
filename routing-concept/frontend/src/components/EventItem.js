import { Link, useSubmit } from 'react-router-dom';
import classes from './EventItem.module.css';

function EventItem({ event }) {
	const submit = useSubmit(); // this hook return a submit fn that will used to send the submit request and relevant action will be called

	function startDeleteHandler() {
		const proceed = window.confirm(
			'Are you sure you want to delete this event?'
		);

		if (proceed) {
			submit(null, { method: 'DELETE' }); // here we are configuring the request that has to be sent programmatically, action can also be configured to 'some-different-path' if the action is declared in another route than the current route of this element belong. In this case, this child component belongs to the element of '/events/:eventId' and with the same route the relevant action is associated
		}
	}

	return (
		<article className={classes.event}>
			<img src={event.image} alt={event.title} />
			<h1>{event.title}</h1>
			<time>{event.date}</time>
			<p>{event.description}</p>
			<menu className={classes.actions}>
				{/*It's relative routing [no '/' in the beginning of route], it simply appends the to-part to the current url*/}
				<Link to='edit'>Edit</Link>{' '}
				<button onClick={startDeleteHandler}>Delete</button>
			</menu>
		</article>
	);
}

export default EventItem;
