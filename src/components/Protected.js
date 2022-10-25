import { selectLogin } from '../redux/slice/usersSlice';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const Protected = ({ children }) => {
	const isLoggedIn = useSelector(selectLogin);
	const location = useLocation();

	if (!isLoggedIn) {
		return <Navigate to='/login' replace state={{ from: location }} />;
	}

	return children;
};

export default Protected;
