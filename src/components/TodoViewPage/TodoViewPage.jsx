import React, { useContext, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import TodosContext from '../../contexts/TodosContext';
import GeneralInfoPanel from '../GeneralInfoPanel/GeneralInfoPanel';
import TodoList from '../TodoList/TodoList';
import styles from './TodoViewPage.module.css';

const TodoViewPage = () => {
    let { id } = useParams();
    id = Number(id);

    const { todosInfo } = useContext(TodosContext);
    const { todos } = todosInfo;
    const todo = todos.find(t => t.id === id);

    const [isEditMode, setIsEditMode] = useState(false);

    if (!todo) return <Navigate to='/' />

    const tasks = todo.tasks;

    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const uncompleted = total - completed;

    const isProgressVisible = total !== 0;

    return (
        <div className={styles.wrapper}>
            <div className={styles.leftBox}>
                <Link to='/' className={styles.homeBtn} />

                <TodoList id={id} isEditMode={isEditMode} />
            </div>

            <div className={styles.rightBox}>
                <GeneralInfoPanel
                    total={total}
                    completed={completed}
                    uncompleted={uncompleted}
                    progress={isProgressVisible ? todo.progress : null} />

                <input
                    className={[styles.editBtn, isEditMode ? styles.active : ''].join(' ')}
                    type='button' 
                    value={isEditMode ? 'Disable Edit Mode' : 'Enable Edit Mode'}
                    onClick={() => setIsEditMode(cur => !cur)} />
            </div>
        </div>
    );
};

export default TodoViewPage;
