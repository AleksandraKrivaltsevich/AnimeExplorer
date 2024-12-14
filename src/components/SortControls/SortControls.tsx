import styles from './SortControls.module.css';
import React from "react";


interface SortControlsProps {
    sortOrder: string;
    changeSort: (order: string) => void;
}
const SortControls:React.FC<SortControlsProps> = ({ sortOrder, changeSort } : SortControlsProps) => { //props.sortOrder и props.changeSort
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
                className={`${styles.SortBtn} ${sortOrder === '-averageRating' ? styles.active : ''}`}
                onClick={() => changeSort('-averageRating')}
            >
                Sort by Top Rated
            </button>
        </div>
    );
};

export default SortControls;

