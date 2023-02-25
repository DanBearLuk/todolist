import React, { useMemo, useState } from 'react';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import TodoViewPage from './components/TodoViewPage/TodoViewPage';
import TodosContext from './contexts/TodosContext';
import './index.css';
import { 
    addToStorage, 
    getOrCreateStorage, 
    removeFromStorage, 
    updateTodoList
} from './modules/TodoStorageFuncs';

const App = () => {
    const router = createBrowserRouter([
        {
            path: '*',
            element: (
                <HomePage />
            ),
        },
        {
            path: '/todo/:id',
            element: (
                <TodoViewPage />
            ),
        },
    ]);

    const [todosInfo, setTodosInfo] = useState(getOrCreateStorage());
    const contextObject = useMemo(() => ({
        todosInfo,
        addToStorage: (title) => {
            const storage = addToStorage(title);
            setTodosInfo(storage);
        },
        removeFromStorage: (id) => {
            const storage = removeFromStorage(id);
            setTodosInfo(storage);
        },
        updateTodoList: (TodoListObject) => {
            const storage = updateTodoList(TodoListObject);
            setTodosInfo(storage);
        }
    }), [todosInfo, setTodosInfo]);
      
    return (
        <TodosContext.Provider value={contextObject}>
            <RouterProvider router={router} />
        </TodosContext.Provider>
    );
};

export default App;
