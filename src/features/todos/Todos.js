import './Todos.css';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	checked,
	deleteTodo,
	fetchTodos,
	selectChecked,
	selectError,
	selectStatus,
	selectTodos,
	updateTodo
} from '../../redux/slice/TodoSlice';

export default function Todos() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	let todos = useSelector(selectTodos);
	const status = useSelector(selectStatus);
	const error = useSelector(selectError);
	const isChecked = useSelector(selectChecked);

	if (isChecked) {
		todos = todos.filter(todo => todo.completed === true);
	}

	useEffect(() => {
		if (status === 'idle') {
			dispatch(fetchTodos());
		}
	}, [dispatch, status]);

	const markDone = (e, todo) => {
		e.stopPropagation();
		dispatch(updateTodo(todo));
	};

	const deleteTodoById = async (e, todoId) => {
		e.stopPropagation();
		const confirmDelete = window.confirm(
			'Are you sure, you want to delete this todo?'
		);
		if (confirmDelete) {
			dispatch(deleteTodo(todoId));
		}
	};

	const checkBoxChangeHandler = e => {
		dispatch(checked());
	};

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center'
			}}>
			<h2>Todos</h2>

			<div style={{ margin: '0 0 1rem' }}>
				<Link to='/add-todo' className='btn'>
					Add Todo
				</Link>
			</div>

			<div style={{ margin: '1rem' }}>
				<label>
					<input type='checkbox' onChange={checkBoxChangeHandler} />
					Show completed todos
				</label>
			</div>

			{error && <div>{error}</div>}

			{status === 'loading' && 'Loading todos...'}

			<section className='todos-list'>
				{todos &&
					todos.map(todo => (
						<article
							key={todo.id}
							onClick={() => navigate(`/todos/${todo.id}`)}>
							{todo.completed ? (
								<h2>
									<strike>{todo.title}</strike>
								</h2>
							) : (
								<h2>{todo.title}</h2>
							)}

							<button className='btn' onClick={e => markDone(e, todo)}>
								{todo.completed ? 'Mark Not Done' : 'Mark Done'}
							</button>

							<span
								className='close'
								title='Delete Todo'
								onClick={e => deleteTodoById(e, todo.id)}>
								&times;
							</span>
						</article>
					))}
			</section>
		</div>
	);
}
