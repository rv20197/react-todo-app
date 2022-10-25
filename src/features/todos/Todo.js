import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectTodobyId } from '../../redux/slice/TodoSlice';

export default function Todo() {
	const { id } = useParams();
	const todo = useSelector(state => selectTodobyId(state, id));

	return <div style={{ padding: '1rem' }}>{todo && <h2>{todo.title}</h2>}</div>;
}
