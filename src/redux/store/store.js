import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../slice/TodoSlice';
import usersReducer from '../slice/usersSlice';

export default configureStore({
	reducer: {
		todos: todoReducer,
		users: usersReducer
	}
});
