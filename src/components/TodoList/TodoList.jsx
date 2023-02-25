import React, { useCallback, useContext, useEffect, useState } from 'react';
import TodosContext from '../../contexts/TodosContext';
import styles from './TodoList.module.css';

const TodoList = ({ id, isEditMode = false }) => {
    const { todosInfo, updateTodoList } = useContext(TodosContext);

    const createTodoCopy = useCallback(() => {
        const todoOriginal = todosInfo.todos.find(t => t.id === id);
        const todoCopied = JSON.parse(JSON.stringify(todoOriginal));

        return todoCopied;
    }, [todosInfo, id]);

    const [todo, setTodo] = useState(createTodoCopy());

    useEffect(() => {
        setTodo(createTodoCopy());
    }, [createTodoCopy]);

    const getNewProgress = () => {
        const total = todo.tasks.length;
        const completed = todo.tasks.filter(t => t.completed).length;

        return (total > 0 ? completed / total : 0);
    }

    useEffect(() => {
        if (isEditMode) return;

        todo.progress = getNewProgress();
        updateTodoList(todo);
    }, [isEditMode]);

    const autoSize = elem => {
        elem.style.height = '5px';
        elem.style.height = elem.scrollHeight + 'px';        
    };

    const tasksElements = todo.tasks.map(task => {
        const onInput = e => {
            autoSize(e.target);

            task.text = e.target.value;
            setTodo({ ...todo });
        };

        setTimeout(() => {
            autoSize(document.getElementById(`task#${task.taskId}`));
        });

        const btnCls = [
            styles.taskBtn,
            isEditMode ? styles.deleteBtn : '',
            task.completed ? styles.completed : styles.uncompleted
        ].join(' ');

        const onBtnClick = e => {
            if (isEditMode) {
                const wrapperElem = e.target.parentNode.parentNode;
                wrapperElem.style.maxHeight = wrapperElem.offsetHeight + 'px';
                wrapperElem.classList.add(styles.deletion);

                setTimeout(() => {
                    todo.tasks = todo.tasks.filter(t => t.taskId !== task.taskId);
                    setTodo({ ...todo });
                }, 300);
            } else {
                task.completed = !task.completed;
                todo.progress = getNewProgress();

                updateTodoList(todo);
            }
        };

        return (
            <div key={task.taskId} className={styles.taskWrapper}>
                <div className={styles.taskInnerWrapper}>
                    <textarea
                        id={`task#${task.taskId}`}
                        className={styles.task}
                        disabled={!isEditMode}
                        rows='1'
                        onInput={onInput}
                        value={task.text} />

                    <input type='button' className={btnCls} onClick={onBtnClick} />
                </div>
            </div>
        );
    });

    if (isEditMode) {
        const addTask = () => {
            document.getElementById('addBtn').classList.add(styles.addBtnTransform);

            setTimeout(() => {
                todo.tasks.push({
                    taskId: todo.lastTaskId + 1,
                    text: `New Task`,
                    completed: false
                })
                todo.lastTaskId++;

                setTimeout(() => 
                    document.getElementById('addBtn').classList.remove(styles.addBtnTransform));
    
                setTodo({ ...todo });
            }, 150);
        };

        tasksElements.push(
            <div key='add' id='addBtn' className={styles.taskWrapper}>
                <input
                    type='button'
                    className={[styles.task, styles.addTaskBtn].join(' ')}
                    onClick={addTask} />
            </div>
        );
    }

    return (
        <div className={styles.wrapper}>
            <textarea
                className={styles.title}
                disabled={!isEditMode}
                rows='1'
                onInput={e => { autoSize(e.target); setTodo({ ...todo, title: e.target.value }); }}
                value={todo.title} />

            <div>
                {tasksElements}
            </div>
        </div>
    );
};

export default TodoList;
