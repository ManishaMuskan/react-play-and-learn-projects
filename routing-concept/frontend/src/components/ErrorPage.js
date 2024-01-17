import React from 'react';
import MainNavigation from './MainNavigation';
import PageContent from './PageContent';
import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
	const error = useRouteError();
	console.log('error occurred', error);
	let title = 'An error occurred!';
	let message = 'Something went wrong, try again!';

	if (error.status === 500) {
		// message = JSON.parse(error.data).message; // This can be used when the Error is thrown using new Response
		message = error.data.message;
	}

	if (error.status === 404) {
		title = 'Not Found';
		message = 'Requested entity or Resource not found!';
	}

	return (
		<>
			<MainNavigation />
			<PageContent title={title}>
				<p>{message}</p>
			</PageContent>
		</>
	);
};

export default ErrorPage;
