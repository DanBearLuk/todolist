import React, { useContext, useEffect, useState } from 'react';
import TodosContext from '../../contexts/TodosContext';
import styles from './TagsInfo.module.css';

const TagsInfo = ({ id }) => {
    const { todosInfo, updateTodoList } = useContext(TodosContext);
    const todo = todosInfo.todos.find(t => t.id === id);
    const tags = todo.tags;

    const [newTagValue, setNewTagValue] = useState('');

    const removeTag = tag => {
        todo.tags = todo.tags.filter(t => t !== tag);

        for (const tagElem of document.getElementById('tags').childNodes) {
            tagElem.style.width = 'fit-content';
        }

        updateTodoList(todo);
    };

    const addTag = () => {
        if (!newTagValue || todo.tags.indexOf(newTagValue) !== -1) return;
        todo.tags.push(newTagValue);

        for (const tagElem of document.getElementById('tags').childNodes) {
            tagElem.style.width = 'fit-content';
        }

        setNewTagValue('');
        updateTodoList(todo);
    };

    const tagsElements = tags.map(tag => (
        <div key={tag} className={styles.tagWrapper}>
            <input type='button' alt='remove' onClick={e => { e.stopPropagation(); removeTag(tag); }} />
            #{tag}
        </div>
    ));

    useEffect(() => {
        for (const tagElem of document.getElementById('tags').childNodes) {
            tagElem.style.width = 'fit-content';
        }
    }, [id]);

    useEffect(() => {
        let curWidth = 0;
        let lastElem;

        for (const tagElem of document.getElementById('tags').childNodes) {
            const elemWidth = tagElem.getBoundingClientRect().width;

            if (curWidth === 0) tagElem.style.borderRadius = '40px 0 0 40px';

            if (curWidth + 15 + elemWidth <= 450) {
                curWidth += 15 + elemWidth;
            } else {
                lastElem.style.width = lastElem.getBoundingClientRect().width + 450 - curWidth + 'px';
                curWidth = elemWidth + 15;
                tagElem.style.borderRadius = '40px 0 0 40px';
            }

            lastElem = tagElem;
        }
        if (lastElem) lastElem.style.width = lastElem.getBoundingClientRect().width + 450 - curWidth + 'px';
    }, [todosInfo, id]);

    return (
        <div className={[styles.wrapper, 'allowSelection'].join(' ')} id='tagsWrapper'>
            <div id='tags'>
                {tagsElements}
            </div>

            <div className={[styles.tagWrapper, styles.newTagWrapper].join(' ')}>
                <input type='button' alt='add' onClick={addTag} />
                <input
                    type='text'
                    value={newTagValue ? '#' + newTagValue : ''}
                    onInput={e => setNewTagValue(e.target.value.replaceAll('#', '').slice(0, 15))}
                    placeholder='#' />
            </div>
        </div>
    );
};

export default TagsInfo;
