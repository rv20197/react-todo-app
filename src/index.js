import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './components/ErrorPage';
import Todos from './features/todos/Todos';
import AddTodo from './features/todos/AddTodo';
//import Todo from './features/todos/Todo';
import { Provider } from 'react-redux';
import store from './redux/store/store';
import Counter from './components/Counter';
import Protected from './components/Protected';
import Login from './features/users/Login';

const Todo = React.lazy(() => import('./features/todos/Todo'));

const router = createBrowserRouter([
	{
		path: process.env.PUBLIC_URL,
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <Todos />
			},
			{
				path: '/todos',
				element: <Todos />
			},
			{
				path: '/add-todo',
				element: (
					<Protected>
						<AddTodo />
					</Protected>
				)
			},
			{
				path: '/todos/:id',
				element: (
					<React.Suspense fallback={<>Loading...</>}>
						<Todo />
					</React.Suspense>
				)
			},
			{
				path: '/counter',
				element: <Counter />
			},
			{
				path: '/login',
				element: <Login />
			}
		]
	}
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		<RouterProvider router={router}>
			<App />
		</RouterProvider>
	</Provider>
);
