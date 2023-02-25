import React, { useContext, useEffect, useState } from 'react';
import TodosContext from '../../contexts/TodosContext';
import AddTodoMiniPanel from '../AddTodoMiniPanel/AddTodoMiniPanel';
import TodoMiniPanel from '../TodoMiniPanel/TodoMiniPanel';
import styles from './TodosGrid.module.css';

const arrowImageData ='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAuNDYgMjIxLjY3Ij48ZGVmcz48c3R5bGU+LmNscy0xe2ZpbGw6bm9uZTtzdHJva2U6I2ZmZjtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbWl0ZXJsaW1pdDoxMDtzdHJva2Utd2lkdGg6MTVweDt9PC9zdHlsZT48L2RlZnM+PGcgaWQ9IkxheWVyXzIiIGRhdGEtbmFtZT0iTGF5ZXIgMiI+PGcgaWQ9IkxheWVyXzEtMiIgZGF0YS1uYW1lPSJMYXllciAxIj48bGluZSBjbGFzcz0iY2xzLTEiIHgxPSI2MC4yMyIgeTE9IjIxNC4xNyIgeDI9IjYwLjIzIiB5Mj0iNy41Ii8+PGxpbmUgY2xhc3M9ImNscy0xIiB4MT0iMTEyLjk2IiB5MT0iODQuNDUiIHgyPSI2MC4yMyIgeTI9IjcuNSIvPjxsaW5lIGNsYXNzPSJjbHMtMSIgeDE9IjcuNSIgeTE9Ijg0LjQ1IiB4Mj0iNjAuMjMiIHkyPSI3LjUiLz48L2c+PC9nPjwvc3ZnPg==';

const TodosGrid = ({ selectedId, onTodoSelect }) => {
    const [isAscendingOrder, setIsAscendingOrder] = useState(true);
    const [sortType, setSortType] = useState('title');
    const [tagValue, setTagValue] = useState('');
    const [todosList, setTodosList] = useState([]);

    const { todosInfo, removeFromStorage } = useContext(TodosContext);

    const compareFn = (a, b) => {
        if (sortType === 'title') {
            const t1 = a.title.toUpperCase();
            const t2 = b.title.toUpperCase();
            const res = isAscendingOrder ? t1.localeCompare(t2) : t2.localeCompare(t1);

            return res;
        } else {
            const p1 = a.tasks.length > 0 ? a.progress : -1;
            const p2 = b.tasks.length > 0 ? b.progress : -1;
            const res = isAscendingOrder ? p1 - p2 : p2 - p1;

            return res;
        }
    };

    useEffect(() => {
        setTodosList([...todosInfo.todos]);
    }, [setTodosList, todosInfo]);

    todosList.sort(compareFn);

    const onTagInput = e => {
        const newTagValue = e.target.value.replaceAll('#', '').slice(0, 15);

        setTagValue(newTagValue);

        if (newTagValue) {
            setTodosList([...todosInfo.todos].filter(
                todo => todo.tags.map(t => t.toUpperCase()).includes(newTagValue.toUpperCase())
            ));
        } else {
            setTodosList([...todosInfo.todos]);
        }
    }
    
    return (
        <div>
            <div className={styles.filtersWrapper}>
                <label htmlFor='sort-type'>
                    Sort By:
                </label>

                <input 
                    type='image' 
                    alt='ascending'
                    className={isAscendingOrder ? '' : styles.descending}
                    onClick={()=> setIsAscendingOrder(cur => !cur)}
                    src={arrowImageData} />

                <select id='sort-type' value={sortType} onChange={e => setSortType(e.target.value)}>
                    <option value='title'>Title</option>
                    <option value='progress'>Progress</option>
                </select>

                <div className={styles.separator} />

                <label>
                    <span>Filter By Tag:</span>
                    <input
                        type='text'
                        value={tagValue ? '#' + tagValue : ''}
                        onInput={onTagInput}
                        placeholder='#            ' />
                </label>
            </div>

            <div className={styles.gridWrapper}>
                <div className={styles.grid}>
                    {todosList.map(t => (
                        <TodoMiniPanel
                            key={t.id}
                            id={t.id}
                            title={t.title}
                            progress={t.progress}
                            hasTasks={t.tasks.length > 0}
                            isSelected={t.id === selectedId}
                            onSelect={() => onTodoSelect(t.id)} 
                            onRemove={() => { onTodoSelect(null); removeFromStorage(t.id) }} />
                    ))}

                    <AddTodoMiniPanel onCreate={id => onTodoSelect(id, true)} />
                </div>
            </div>
        </div>
    );
};

export default TodosGrid;
