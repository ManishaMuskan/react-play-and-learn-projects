import { Suspense, lazy } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import EditEventPage from './pages/EditEvent';
import ErrorPage from './pages/Error';
import EventDetailPage, {
	loader as eventDetailLoader,
	action as deleteEventAction,
} from './pages/EventDetail';
// import EventsPage, { loader as eventsLoader } from './pages/Events';
import EventsRootLayout from './pages/EventsRoot';
import HomePage from './pages/Home';
//import NewEventPage from './pages/NewEvent';
import RootLayout from './pages/Root';
import { action as manipulateEventAction } from './components/EventForm';
import NewsletterPage, { action as newsletterAction } from './pages/Newsletter';
import AuthenticationPage from './pages/Authentication';
import { action as authenticateAction } from './components/AuthForm';
import { action as logoutAction } from './pages/logout';
import { tokenLoader, checkAuthLoader } from './util/auth';

//------------Lazy Loading------------
const NewEventPage = lazy(() => import('./pages/NewEvent'));
const EventsPage = lazy(() => import('./pages/Events'));

const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		errorElement: <ErrorPage />,
		id: 'root',
		loader: tokenLoader,
		children: [
			{ index: true, element: <HomePage /> },
			{
				path: 'events',
				element: <EventsRootLayout />,
				children: [
					{
						index: true,
						element: <EventsPage />,
						// loader: eventsLoader,
						loader: () =>
							import('./pages/Events').then((module) => module.loader()), //importing dynamically from the lazily loaded module
					},
					{
						path: ':eventId',
						id: 'event-detail',
						loader: eventDetailLoader,
						children: [
							{
								index: true,
								element: <EventDetailPage />,
								action: deleteEventAction,
								loader: checkAuthLoader,
							},
							{
								path: 'edit',
								element: <EditEventPage />,
								action: manipulateEventAction,
								loader: checkAuthLoader,
							},
						],
					},
					{
						path: 'new',
						element: (
							<Suspense fallback={<p>Loading...</p>}>
								<NewEventPage />
							</Suspense>
						),
						action: manipulateEventAction,
						loader: checkAuthLoader, // here the loader is getting imported from different file than the module which is loaded lazily, so no dynamic import needed
					},
				],
			},
			{
				path: 'newsletter',
				element: <NewsletterPage />,
				action: newsletterAction,
			},
			{
				path: 'authentication',
				element: <AuthenticationPage />,
				action: authenticateAction,
			},
			{
				path: 'logout',
				action: logoutAction,
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
