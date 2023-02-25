import React from 'react';
import InfoPanel from '../InfoPanel/InfoPanel';
import styles from './GeneralInfoPanel.module.css';

const GeneralInfoPanel = ({ total, completed, uncompleted, progress = null }) => {
    let color = '';

    if (progress < 0.5) {
        color = `rgba(255, ${255 * progress * 2}, 100)`;
    } else {
        color = `rgba(${255 * (2 - progress * 2)}, 255, 100)`;
    }

    const progressStyle = { color };

    return (
        <InfoPanel>
            <p className={styles.generalInfo}>
                Total: <span className={styles.totalNum}>{total}</span> <br />
                Completed: <span className={styles.completedNum}>{completed}</span> <br />
                Uncompleted: <span className={styles.uncompletedNum}>{uncompleted}</span> <br />

                {(progress !== null) && (<>
                    General progress: <span className={styles.progressNum} style={progressStyle}>{Math.floor(progress * 100)}%</span>
                </>)}
            </p>   
        </InfoPanel>
    );
};

export default GeneralInfoPanel;
