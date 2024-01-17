import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './components/HomePage';
import EventsPage from './components/EventsPage';
import EventDetailPage, {
	loader as eventDetailsLoader,
	action as deleteEventAction,
} from './components/EventDetailPage';
import NewEventPage from './components/NewEventPage';
import EditEventPage from './components/EditEventPage';
import RootLayout from './components/RootLayout';
import EventsRootLayout from './components/EventsRootLayout';
import { loader as eventsLoader } from './components/EventsPage';
import ErrorPage from './components/ErrorPage';
import { action as manipulateEventAction } from './components/EventForm';
import NewsletterPage, {
	action as newsletterAction,
} from './components/Newsletter';

const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		errorElement: <ErrorPage />,
		children: [
			{ element: <HomePage />, index: true },
			{
				path: 'events',
				element: <EventsRootLayout />,
				children: [
					{ element: <EventsPage />, index: true, loader: eventsLoader },
					{
						path: ':eventId',
						loader: eventDetailsLoader,
						id: 'event-detail',
						children: [
							{
								index: true,
								element: <EventDetailPage />,
								action: deleteEventAction,
							},
							{
								path: 'edit',
								element: <EditEventPage />,
								action: manipulateEventAction,
							},
						],
					},
					{
						path: 'new',
						element: <NewEventPage />,
						action: manipulateEventAction,
					},
				],
			},
			{
				path: 'newsletter',
				element: <NewsletterPage />,
				action: newsletterAction,
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router}></RouterProvider>;
}

export default App;
