import React, { useContext } from 'react';
import TodosContext from '../../contexts/TodosContext';
import styles from './AddTodoMiniPanel.module.css';

const AddTodoMiniPanel = ({ onCreate }) => {
    const { todosInfo, addToStorage } = useContext(TodosContext);

    const onClick = () => {
        const newId = todosInfo.lastId + 1;
        const title = `New TODO ${newId}`;

        addToStorage(title);
        onCreate(newId);
    };

    return (
        <div className={[styles.panel, 'allowSelection'].join(' ')} onClick={onClick}>
            <div className={styles.inner}>
            </div>
        </div>
    );
};

export default AddTodoMiniPanel;
