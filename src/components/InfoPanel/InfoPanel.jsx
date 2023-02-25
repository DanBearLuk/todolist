import React from 'react';
import styles from './InfoPanel.module.css';

const InfoPanel = ({ children }) => {
    return (
        <div className={[styles.panel, 'allowSelection'].join(' ')}>
            {children}
        </div>
    );
};

export default InfoPanel;
