import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './TodoMiniPanel.module.css';

const TodoMiniPanel = ({ id, title, progress, hasTasks, isSelected, onSelect, onRemove }) => {
    let color = '';

    if (progress < 0.5) {
        color = `rgba(255, ${255 * progress * 2}, 0, .5)`;
    } else {
        color = `rgba(${255 * (2 - progress * 2)}, 255, 0, .5)`;
    }

    const progressBarStyle = {
        width: progress * 100 + '%',
        backgroundColor: color
    };

    const panelCls = [styles.panel, 'allowSelection', isSelected ? styles.selected : ''].join(' ');

    const onPanelClick = e => {
        if (e.target.tagName === 'input') return;

        onSelect();
    };

    const progressStr = !hasTasks ?
        'No tasks' :
        Math.round(progress * 1000) / 10 + '%';

    return (
        <div className={panelCls} onClick={onPanelClick}>
            <p className={styles.title}>
                {title}
            </p>

            <div className={styles.progressBarWrapper}>
                <span>{progressStr}</span>
                <div className={styles.progressBar} style={progressBarStyle} />
            </div>

            <div className={styles.btnsWrapper}>
                <Link to={`/todo/${id}`}className={styles.openBtn}>Open</Link>
                <button className={styles.deleteBtn} onClick={e => { e.stopPropagation(); onRemove(); }} />
            </div>
        </div>
    );
};

export default TodoMiniPanel;
