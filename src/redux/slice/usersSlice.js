import { createSlice } from '@reduxjs/toolkit';

export const usersSlice = createSlice({
	name: 'users',
	initialState: {
		isLoggedIn: !!localStorage.getItem('isLoggedIn')
	},
	reducers: {
		login: (state, action) => {
			localStorage.setItem('isLoggedIn', true);
			return {
				...state,
				isLoggedIn: true
			};
		},
		logout: (state, action) => {
			localStorage.removeItem('isLoggedIn');
			return {
				...state,
				isLoggedIn: false
			};
		}
	}
});

//actions - Synchronous Actions
export const { login, logout } = usersSlice.actions;

// reducers
export default usersSlice.reducer;

// selector
export const selectLogin = state => state.users.isLoggedIn;
