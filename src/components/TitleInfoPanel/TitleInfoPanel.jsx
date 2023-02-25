import React, { useContext, useEffect, useState } from 'react';
import TodosContext from '../../contexts/TodosContext';
import InfoPanel from '../InfoPanel/InfoPanel';
import styles from './TitleInfoPanel.module.css';

const TitleInfoPanel = ({ id }) => {
    const { todosInfo, updateTodoList } = useContext(TodosContext);
    const { todos } = todosInfo;
    
    const [curTitleValue, setCurTitleValue] = useState();

    const changeSave = e => {
        const todoListObject = todos.find(t => t.id === id);
        todoListObject.title = e.target.value;

        updateTodoList(todoListObject);
    };

    useEffect(() => {
        setCurTitleValue(todos.find(t => t.id === id).title)
    }, [setCurTitleValue, todos, id]);

    return (
        <InfoPanel>
            <div className={styles.titleInfo}>
                <label htmlFor='title'>Title</label>
                <textarea
                    id='title' 
                    rows='3' 
                    value={curTitleValue} 
                    onInput={e => setCurTitleValue(e.target.value)} 
                    onBlur={changeSave} />
            </div>        
        </InfoPanel>
    );
};

export default TitleInfoPanel;
