import { useEffect } from 'react';
import {
	Form,
	Link,
	json,
	redirect,
	useActionData,
	useSearchParams,
	useNavigation,
} from 'react-router-dom';

import classes from './AuthForm.module.css';

function AuthForm() {
	//const [isLogin, setIsLogin] = useState(true);
	const [searchParams, setSearchParams] = useSearchParams();
	const isLogin = searchParams.get('mode') === 'login' ? 'login' : 'signup';
	const data = useActionData();
	const navigation = useNavigation();

	useEffect(() => {
		if (!searchParams.get('mode')) {
			setSearchParams((params) => {
				params.set('mode', 'login');
				return params;
			});
		}
	}, [searchParams, setSearchParams]);

	// function switchAuthHandler() {
	// 	setIsLogin((isCurrentlyLogin) => !isCurrentlyLogin);
	// }

	return (
		<>
			<Form method='post' className={classes.form}>
				{/* <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1> */}
				<h1>{isLogin === 'login' ? 'Log in' : 'Create a new user'}</h1>
				{
					<ul>
						{data &&
							data.errors &&
							Object.values(data.errors).map((err) => <li key={err}>{err}</li>)}
					</ul>
				}
				<p>
					<label htmlFor='email'>Email</label>
					<input id='email' type='email' name='email' required />
				</p>
				<p>
					<label htmlFor='image'>Password</label>
					<input id='password' type='password' name='password' required />
				</p>
				<div className={classes.actions}>
					<Link to={`?mode=${isLogin === 'login' ? 'signup' : 'login'}`}>
						{isLogin === 'login'
							? 'Not registered? Create new user'
							: 'Already Signed up? Login'}
					</Link>
					{/* <button onClick={switchAuthHandler} type='button'>
						{isLogin ? 'Create new user' : 'Login'}
					</button> */}
					<button disabled={navigation.state === 'submitting'}>
						{navigation.state === 'submitting' ? 'Submitting' : 'Save'}
					</button>
				</div>
				{data && (
					<p style={{ color: 'red', textAlign: 'center' }}>{data.message}</p>
				)}
			</Form>
		</>
	);
}

export default AuthForm;

export const action = async ({ request, params }) => {
	const searchParams = new URL(request.url).searchParams;
	const mode = searchParams.get('mode') || 'login';

	console.log('mode', mode);

	if (mode !== 'login' && mode !== 'signup') {
		throw json({ message: 'Unsupported mode!' }, { status: 422 });
	}

	const data = await request.formData();
	const authData = { email: data.get('email'), password: data.get('password') };

	const response = await fetch(`http://localhost:8080/${mode}`, {
		method: 'post',
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify(authData),
	});

	if (response.status === 401 || response.status === 422) {
		return response;
	}

	if (!response.ok) {
		throw json({ message: 'could not authenticate user' }, { status: 500 });
	}

	const resData = await response.json();
	localStorage.setItem('token', resData.token);
	const expiration = new Date();
	expiration.setHours(expiration.getHours() + 1);
	localStorage.setItem('expiration', expiration.toISOString());

	return redirect('/');
};
