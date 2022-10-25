import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

//Thunk (Async Actions)
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
	const res = await axios.get(`${process.env.REACT_APP_API_END_POINT}/todos`);
	return res.data;
});

export const addTodo = createAsyncThunk('todos/addTodo', async todoForm => {
	const res = await axios.post(
		`${process.env.REACT_APP_API_END_POINT}/todos`,
		todoForm
	);
	return res.data;
});

export const updateTodo = createAsyncThunk('todos/updateTodo', async todo => {
	const res = await axios.patch(
		`${process.env.REACT_APP_API_END_POINT}/todos/${todo.id}`,
		{
			...todo,
			completed: !todo.completed
		}
	);
	return res.data;
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async todoId => {
	await axios.delete(`${process.env.REACT_APP_API_END_POINT}/todos/${todoId}`);
	return todoId;
});

export const todoSlice = createSlice({
	name: 'todos',
	initialState: {
		count: 0,
		todoItems: [],
		status: 'idle',
		error: null,
		isChecked: false
	},
	reducers: {
		increment: (state, action) => {
			return {
				...state,
				count: state.count + action.payload
			};
		},
		decrement: (state, action) => {
			return {
				...state,
				count: state.count - action.payload
			};
		},
		checked: (state, action) => {
			return {
				...state,
				isChecked: !state.isChecked
			};
		}
	},
	extraReducers(builder) {
		builder.addCase(fetchTodos.pending, (state, action) => {
			return {
				...state,
				status: 'loading'
			};
		});

		builder.addCase(fetchTodos.fulfilled, (state, action) => {
			return {
				...state,
				status: 'completed',
				todoItems: action.payload
			};
		});

		builder.addCase(fetchTodos.rejected, (state, action) => {
			return {
				...state,
				status: 'failed',
				todoItems: [],
				error: action.payload.message
			};
		});

		builder.addCase(addTodo.pending, (state, action) => {
			return {
				...state,
				status: 'loading'
			};
		});

		builder.addCase(addTodo.fulfilled, (state, action) => {
			return {
				...state,
				status: 'completed',
				todoItems: [...state.todoItems, action.payload]
			};
		});

		builder.addCase(addTodo.rejected, (state, action) => {
			return {
				...state,
				status: 'failed',
				todoItems: state.todoItems,
				error: action.payload.message
			};
		});

		builder.addCase(updateTodo.pending, (state, action) => {
			return {
				...state,
				status: 'loading'
			};
		});

		builder.addCase(updateTodo.fulfilled, (state, action) => {
			const todoPayload = action.payload;
			const updatedTodos = state.todoItems.map(todo => {
				if (todo.id === todoPayload.id) {
					return {
						...todo,
						completed: !todo.completed
					};
				}
				return todo;
			});
			return {
				...state,
				status: 'completed',
				todoItems: updatedTodos
			};
		});

		builder.addCase(updateTodo.rejected, (state, action) => {
			return {
				...state,
				status: 'failed',
				todoItems: state.todoItems,
				error: action.payload.message
			};
		});

		builder.addCase(deleteTodo.pending, state => {
			return {
				...state,
				status: 'loading'
			};
		});

		builder.addCase(deleteTodo.fulfilled, (state, action) => {
			const deletedTodoId = action.payload;
			const allTodos = state.todoItems.filter(
				todo => todo.id !== deletedTodoId
			);

			return {
				...state,
				status: 'completed',
				todoItems: allTodos
			};
		});

		builder.addCase(deleteTodo.rejected, (state, action) => {
			return {
				...state,
				status: 'failed',
				todoItems: state.todoItems,
				error: action.payload.data.message
			};
		});
	}
});

//actions - Synchronous Actions
export const { increment, decrement, checked } = todoSlice.actions;

// reducers
export default todoSlice.reducer;

// selector
export const selectCount = state => state.todos.count;
export const selectTodos = state => state.todos.todoItems;
export const selectStatus = state => state.todos.status;
export const selectError = state => state.todos.error;
export const selectTodobyId = (state, todoId) => {
	return state.todos.todoItems.find(item => item.id === +todoId);
};
export const selectChecked = state => state.todos.isChecked;
