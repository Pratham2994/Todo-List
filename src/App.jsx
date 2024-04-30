import { useState, useEffect } from 'react';
import Nav from './components/Nav';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, settodo] = useState('');
  const [todos, settodos] = useState([]);

  useEffect(() => {
    const todostring = localStorage.getItem('todos');
    if (todostring) {
      const storedTodos = JSON.parse(todostring);
      settodos(storedTodos);
    }
  }, []);

  const handleChange = (e) => {
    settodo(e.target.value);
  };

  const saveTLS = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, iscompleted: false }]);
    settodo('');
    saveTLS();
  };

  const toggleCompletion = (e) => {
    const id = e.target.name;
    const newTodos = todos.map((t) => {
      if (t.id === id) {
        return { ...t, iscompleted: !t.iscompleted };
      }
      return t;
    });
    settodos(newTodos);
    saveTLS();
  };

  const handleEdit = (id) => {
    const todoToEdit = todos.find((t) => t.id === id);
    settodo(todoToEdit.todo);
    const newTodos = todos.filter((t) => t.id !== id);
    settodos(newTodos);
    saveTLS();
  };

  const handleDelete = (id) => {
    const newTodos = todos.filter((t) => t.id !== id);
    settodos(newTodos);
    saveTLS();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Nav />
      <div className="container mx-auto p-6">
        <div className="flex flex-col items-center">
          <div className="bg-gray-800 p-6 rounded-xl w-full md:w-2/3 lg:w-1/2 xl:w-1/3">
            <div className="flex">
              <input
                type="text"
                onChange={handleChange}
                value={todo}
                placeholder="Enter Task"
                className="flex-grow p-3 bg-gray-700 text-white rounded-l-xl"
              />
              <button
                type="submit"
                onClick={handleAdd}
                className="bg-pink-500 hover:bg-pink-600 text-white p-3 rounded-r-xl"
              >
                Save
              </button>
            </div>

            <div className="mt-6">
              {todos.length === 0 ? (
                <div className="text-center text-lg">No Todos Yet</div>
              ) : (
                <div className="flex flex-col space-y-4">
                  {todos.map((item) => (
                    <div key={item.id} className="flex justify-between items-center bg-gray-700 p-3 rounded-xl">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name={item.id}
                          checked={item.iscompleted}
                          onChange={toggleCompletion}
                          className="form-checkbox h-6 w-6 text-pink-500"
                        />
                        <span
                          className={`ml-3 text-lg ${item.iscompleted ? 'line-through' : ''}`}
                        >
                          {item.todo}
                        </span>
                      </div>

                      <div className="flex space-x-4">
                        <button
                          onClick={() => handleEdit(item.id)}
                          className="text-yellow-400 hover:text-yellow-300"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;