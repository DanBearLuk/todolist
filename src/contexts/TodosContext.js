import React from 'react';

const TodosContext = React.createContext({
    todosInfo: {
        lastId: 0,
        todos: []
    },
    addToStorage: () => {},
    removeFromStorage: () => {},
    updateTodoList: () => {}
});

export default TodosContext;
