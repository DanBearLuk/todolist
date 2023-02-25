import React, { useState, useEffect, useContext} from 'react';
import TodosContext from '../../contexts/TodosContext';
import GeneralInfoPanel from '../GeneralInfoPanel/GeneralInfoPanel';
import TagsInfo from '../TagsInfo/TagsInfo';
import TitleInfoPanel from '../TitleInfoPanel/TitleInfoPanel';
import TodosGrid from '../TodosGrid/TodosGrid';
import styles from './HomePage.module.css';

const HomePage = () => {
    const { todosInfo } = useContext(TodosContext);
    const { todos } = todosInfo;

    const [selectedId, setSelectedId] = useState(null);

    let infoPanel;
    if (selectedId === null) {
        const total = todos.length;
        const completed = todos.reduce(
            (prev, t) => prev + Number(t.progress === 1), 
            0
        );
        const uncompleted = todos.reduce(
            (prev, t) => prev + Number(t.progress !== 1 && t.tasks.length > 0), 
            0
        );
        const progress = todos.reduce(
            (prev, t) => prev + t.progress, 
            0
        ) / (completed + uncompleted);

        const isProgressVisible = Boolean(completed || uncompleted);

        infoPanel = (
            <GeneralInfoPanel
                total={total}
                completed={completed}
                uncompleted={uncompleted}
                progress={isProgressVisible ? progress : null} />
        );
    } else {
        infoPanel = (<TitleInfoPanel id={selectedId} />);
    }

    useEffect(() => {
        const onClick = e => {
            if (!e.target.closest('.allowSelection')) setSelectedId(null);
        };

        document.addEventListener('click', onClick);
        return () => document.removeEventListener('click', onClick);
    }, []);

    const onTodoSelect = (id, forceFocus) => {
        setSelectedId(id);

        if (forceFocus) setTimeout(() => document.getElementById('title').focus());
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.leftBox}>
                <TodosGrid selectedId={selectedId} onTodoSelect={onTodoSelect}/>
            </div>

            <div className={styles.rightBox}>
                {infoPanel}
                {(selectedId !== null) && (
                    <TagsInfo id={selectedId} />
                )}
            </div>
        </div>
    );
};

export default HomePage;
