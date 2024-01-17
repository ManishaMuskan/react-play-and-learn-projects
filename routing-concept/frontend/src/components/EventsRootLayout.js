import React from 'react';
import EventsNavigation from './EventsNavigation';
import { Outlet } from 'react-router-dom';

const EventsRootLayout = () => {
	return (
		<>
			<EventsNavigation />
			<Outlet />
		</>
	);
};

export default EventsRootLayout;
