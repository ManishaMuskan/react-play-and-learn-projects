import { useLoaderData, json, defer, Await } from 'react-router-dom';
import { Suspense } from 'react';
import EventsList from '../components/EventsList';

function EventsPage() {
	const fetchedEvents = useLoaderData();
	console.log('----fet', fetchedEvents);
	// if (fetchedEvents.isError) {
	// 	return <p>{fetchedEvents.message}</p>;
	// }
	return (
		<Suspense fallback={<p style={{ 'text-align': 'center' }}>loading...</p>}>
			<Await resolve={fetchedEvents.events}>
				{(events) => {
					console.log('-----events----', events);
					return <EventsList events={events} />;
				}}
			</Await>
		</Suspense>
	);
}

export default EventsPage;

const loadEvents = async () => {
	const response = await fetch('http://localhost:8080/events');

	if (!response.ok) {
		// return { isError: true, message: "couldn't fetch events" };
		// throw new Error("couldn't fetch events");
		// throw new Response(JSON.stringify({ message: 'can not fetch details!' }), {
		// 	status: 500,
		// });
		throw json({ message: 'cannot fetch the details' }, { status: 500 }); // this utility fn provided by react-router-dom to ease the syntax
	} else {
		const resData = await response.json();
		return resData.events;
	}
};

// This loader will be executed before navigating to the route where this loader is defined and respective/parental errorElement will be rendered
export const loader = async () => {
	return defer({
		events: loadEvents(),
	});
};
