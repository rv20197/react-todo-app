import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { login, selectLogin } from '../../redux/slice/usersSlice';

const Login = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isLoggedIn = useSelector(selectLogin);
	const location = useLocation();

	const from = location.state?.from?.pathname || '/';

	if (isLoggedIn) {
		return <Navigate to='/' replace />;
	}

	const loginHandler = () => {
		dispatch(login());
		navigate(from, { replace: true });
	};

	return (
		<div>
			<h2>Login</h2>
			<button onClick={loginHandler}>Login</button>
		</div>
	);
};

export default Login;
