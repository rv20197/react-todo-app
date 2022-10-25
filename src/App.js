import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import { logout, selectLogin } from './redux/slice/usersSlice';

function App() {
	const isLoggedIn = useSelector(selectLogin);
	const dispatch = useDispatch();

	const logoutHandler = () => {
		dispatch(logout());
	};

	return (
		<div className='App'>
			<nav className='nav-list'>
				<h2>Todos App</h2>

				<div className='menu-items'>
					<NavLink to='/todos'>Todos</NavLink>
					<NavLink to='/add-todo'>Add Todo</NavLink>
					<NavLink to='/counter'>Counter</NavLink>
					{!isLoggedIn && <NavLink to='/login'>Login</NavLink>}
					{isLoggedIn && <button onClick={logoutHandler}>Logout</button>}
				</div>
			</nav>

			<Outlet />
		</div>
	);
}

export default App;
