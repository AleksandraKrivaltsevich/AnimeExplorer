import React, { useState } from 'react';
import styles from './AnimeFilter.module.css';
import Slider from '../Slider/Slider';


interface AnimeFilterProps {
    pendingEpisodeCountRange: [number, number];
    setPendingEpisodeCountRange: (range: [number, number]) => void;
    pendingYearRange: [number, number];
    setPendingYearRange: (range: [number, number]) => void;
    applyFilters: () => void;
}

const AnimeFilter: React.FC<AnimeFilterProps> = ({
                                                     pendingEpisodeCountRange,
                                                     setPendingEpisodeCountRange,
                                                     pendingYearRange,
                                                     setPendingYearRange,
                                                     applyFilters,
                                                 }) => {
    const [showFilters, setShowFilters] = useState<boolean>(false);

    return (
        <div className={styles.filterContainer}>
            <button
                className={styles.addFilterBtn}
                onClick={() => setShowFilters(!showFilters)}
            >
                {showFilters ? 'Hide Filters' : 'Add Filters'}
            </button>

            {showFilters && (
                <div className={styles.filters}>
                    <Slider
                        label="Episodes"
                        min={0}
                        max={300}
                        range={pendingEpisodeCountRange}
                        setRange={setPendingEpisodeCountRange}
                    />
                    <Slider
                        label="Years"
                        min={1907}
                        max={2026}
                        range={pendingYearRange}
                        setRange={setPendingYearRange}
                    />
                    <button
                        className={styles.applyFilterBtn}
                        onClick={applyFilters}
                    >
                        Apply Filters
                    </button>
                </div>
            )}
        </div>
    );
};

export default AnimeFilter;
