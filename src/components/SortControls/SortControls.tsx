import styles from './SortControls.module.css';
import React from "react";


interface SortControlsProps {
    sortOrder: string;
    changeSort: (order: string) => void;
}
const SortControls:React.FC<SortControlsProps> = ({ sortOrder, changeSort }) => {
    return (
        <div className={styles.sortControls}>
            <button
                className={`${styles.SortBtn} ${sortOrder === '-startDate' ? styles.active : ''}`}
                onClick={() => changeSort('-startDate')}
            >
                Sort by Newest
            </button>
            <button
                className={`${styles.SortBtn} ${sortOrder === 'startDate' ? styles.active : ''}`}
                onClick={() => changeSort('startDate')}
            >
                Sort by Oldest
            </button>
            <button
                className={`${styles.SortBtn} ${sortOrder === 'ratingRank' ? styles.active : ''}`}
                onClick={() => changeSort('ratingRank')}
            >
                Sort by Top Rated
            </button>
        </div>
    );
};

export default SortControls;

