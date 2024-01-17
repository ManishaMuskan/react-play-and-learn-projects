import React, { Suspense } from 'react';
import {
	json,
	redirect,
	useRouteLoaderData,
	defer,
	Await,
} from 'react-router-dom';
import EventItem from './EventItem';
import PageContent from './PageContent';
import EventsList from './EventsList';

const EventDetailPage = () => {
	const { events, eventDetail } = useRouteLoaderData('event-detail');
	return (
		<>
			<Suspense fallback={<PageContent>loading...</PageContent>}>
				<Await
					resolve={eventDetail}
					errorElement={<PageContent>Some error occurred</PageContent>}>
					{(loadedEvent) => {
						return <EventItem event={loadedEvent.event} />;
					}}
				</Await>
			</Suspense>
			<Suspense fallback={<PageContent>loading...</PageContent>}>
				<Await
					resolve={events}
					errorElement={<PageContent>Some error occurred</PageContent>}>
					{(loadedEvents) => {
						return <EventsList events={loadedEvents} />;
					}}
				</Await>
			</Suspense>
		</>
	);
};

export default EventDetailPage;

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

const loadEventDetails = async (params) => {
	const response = await fetch(
		`http://localhost:8080/events/${params.eventId}`
	);

	if (!response.ok) {
		throw json(
			{
				message: "couldn't fetch the details for the selected event",
			},
			{ status: 500 }
		);
	} else {
		const resData = await response.json();
		return resData;
	}
};

export const loader = async ({ request, params }) => {
	return defer({
		events: loadEvents(),
		eventDetail: await loadEventDetails(params),
	});
};

export const action = async ({ request, params }) => {
	const response = await fetch(
		`http://localhost:8080/events/${params.eventId}`,
		{
			// this can also be fetched using the current request method - request.method that we will be setting while submitting the action programmatically
			method: request.method,
		}
	);

	if (!response.ok) {
		throw json(
			{
				message: "couldn't delete event",
			},
			{ status: 500 }
		);
	} else {
		return redirect('/events');
	}
};
