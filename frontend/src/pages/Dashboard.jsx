import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getTodos, createTodo, updateTodo, deleteTodo, reset } from '../features/todos/todosSlice';
import Spinner from '../components/Spinner';
import TodoItem from '../components/TodoItem';
import TodoForm from '../components/TodoForm';

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { todos, isLoading, isError, message } = useSelector((state) => state.todos);

  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (!user) {
      navigate('/login');
      return;
    }

    dispatch(getTodos());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  const handleCreateTodo = (todoData) => {
    dispatch(createTodo(todoData));
    toast.success('Task added successfully!');
  };

  const handleUpdateTodo = (id, todoData) => {
    if (editingTodo && editingTodo._id === id) {
      dispatch(updateTodo({ id, todoData }));
      setEditingTodo(null);
      toast.success('Task updated successfully!');
    } else {
      // If it's a toggle completion action
      dispatch(updateTodo({ id, todoData }));
    }
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
    toast.success('Task deleted successfully!');
  };

  const setTodoToEdit = (todo) => {
    setEditingTodo(todo);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className='container'>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Tasks Dashboard</p>
      </section>

      <section className='form'>
        <TodoForm onSubmit={handleCreateTodo} initialData={editingTodo} />
      </section>

      <section className='content'>
        {todos.length > 0 ? (
          <div className='todos'>
            {todos.map((todo) => (
              <TodoItem
                key={todo._id}
                todo={todo}
                onUpdate={(id, data) => {
                  if (data._id) {
                    // If full todo object passed, set it for editing
                    setTodoToEdit(data);
                  } else {
                    // If just updating a field like completion status
                    handleUpdateTodo(id, data);
                  }
                }}
                onDelete={handleDeleteTodo}
              />
            ))}
          </div>
        ) : (
          <h3>You have not set any tasks yet</h3>
        )}
      </section>
    </div>
  );
}

export default Dashboard; 