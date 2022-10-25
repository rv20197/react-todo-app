import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	increment,
	selectCount,
	decrement,
	selectTodos
} from '../redux/slice/TodoSlice';

const Counter = () => {
	const dispatch = useDispatch();
	const count = useSelector(selectCount);
	const todos = useSelector(selectTodos);

	const incrementCountBy1 = () => {
		return dispatch(increment(1));
	};

	const decrementCountBy1 = () => {
		return dispatch(decrement(1));
	};
	return (
		<div>
			<h3 style={{ marginLeft: '1rem' }}>Todos Counter</h3>
			<p style={{ marginLeft: '1rem' }}>Total Todos: {todos.length}</p>

			<p style={{ marginLeft: '1rem' }}>{count}</p>
			<button onClick={incrementCountBy1} style={{ marginLeft: '1rem' }}>
				+1
			</button>

			<button onClick={decrementCountBy1} style={{ marginLeft: '1rem' }}>
				-1
			</button>
		</div>
	);
};

export default Counter;
