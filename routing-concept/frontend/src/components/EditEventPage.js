import React from 'react';
import EventForm from './EventForm';
import { useRouteLoaderData } from 'react-router-dom';

const EditEventPage = () => {
	const event = useRouteLoaderData('event-detail');
	return <EventForm event={event} method='PATCH' />;
};

export default EditEventPage;
