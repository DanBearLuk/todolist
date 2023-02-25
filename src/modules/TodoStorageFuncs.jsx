const getOrCreateStorage = () => {
    let storageStr = localStorage.getItem('todos');

    if (storageStr === null) {
        storageStr = JSON.stringify({
            lastId: 0,
            todos: []
        });
        localStorage.setItem('todos', storageStr);
    }

    const storage = JSON.parse(storageStr);
    return storage;
};


const addToStorage = (title) => {
    const storage = JSON.parse(localStorage.getItem('todos'));

    storage.todos.push({
        id: storage.lastId + 1,
        lastTaskId: 0,
        progress: 0,
        title,
        tags: [],
        tasks: []
    });
    storage.lastId++;

    localStorage.setItem('todos', JSON.stringify(storage));

    return storage;
};


const removeFromStorage = (id) => {
    const storage = JSON.parse(localStorage.getItem('todos'));
    storage.todos = storage.todos.filter(t => t.id !== id);

    localStorage.setItem('todos', JSON.stringify(storage));
    return storage;
};


const updateTodoList = (TodoListObject) => {
    const storage = JSON.parse(localStorage.getItem('todos'));
    storage.todos = storage.todos.filter(t => t.id !== TodoListObject.id);
    storage.todos.push(TodoListObject);

    localStorage.setItem('todos', JSON.stringify(storage));
    return storage; 
};


export {
    getOrCreateStorage,
    addToStorage,
    removeFromStorage,
    updateTodoList
};
