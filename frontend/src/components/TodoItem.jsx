import { FaEdit, FaCheck, FaTrash } from 'react-icons/fa';

function TodoItem({ todo, onUpdate, onDelete }) {
  const toggleComplete = () => {
    onUpdate(todo._id, { completed: !todo.completed });
  };

  return (
    <div className={`todo ${todo.completed ? 'completed' : ''}`}>
      <div className='todo-content'>
        <h3>{todo.title}</h3>
        <p>{todo.description}</p>
        <p className='created-at'>
          {new Date(todo.createdAt).toLocaleString()}
        </p>
      </div>
      <div className='todo-actions'>
        <button onClick={toggleComplete} className='btn btn-action'>
          <FaCheck />
        </button>
        <button onClick={() => onUpdate(todo._id, todo)} className='btn btn-action'>
          <FaEdit />
        </button>
        <button onClick={() => onDelete(todo._id)} className='btn btn-action btn-delete'>
          <FaTrash />
        </button>
      </div>
    </div>
  );
}

export default TodoItem; 