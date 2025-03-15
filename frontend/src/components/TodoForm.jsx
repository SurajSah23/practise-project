import { useState, useEffect } from 'react';

function TodoForm({ onSubmit, initialData = null }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  const { title, description } = formData;

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        description: initialData.description || '',
      });
    }
  }, [initialData]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      return;
    }
    
    onSubmit(formData);
    
    if (!initialData) {
      setFormData({
        title: '',
        description: '',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className='form todo-form'>
      <div className='form-group'>
        <label htmlFor='title'>Title</label>
        <input
          type='text'
          name='title'
          id='title'
          value={title}
          onChange={onChange}
          placeholder='Enter your task'
          required
        />
      </div>
      <div className='form-group'>
        <label htmlFor='description'>Description</label>
        <textarea
          name='description'
          id='description'
          value={description}
          onChange={onChange}
          placeholder='Enter task description (optional)'
          rows='3'
        ></textarea>
      </div>
      <div className='form-group'>
        <button type='submit' className='btn btn-block'>
          {initialData ? 'Update Task' : 'Add Task'}
        </button>
      </div>
    </form>
  );
}

export default TodoForm; 