import React, { useState } from 'react';
import ReactSlider from 'react-slider';
import styles from './AnimeFilter.module.css';

interface SliderProps {
    label: string;
    min: number;
    max: number;
    range: [number, number];
    setRange: (range: [number, number]) => void;
}

const Slider: React.FC<SliderProps> = ({ label, min, max, range, setRange }) => (
    <div className={styles.filterGroup}>
        <label className={styles.filterLabel}>{label}:</label>
        <ReactSlider
            className={styles.slider}
            thumbClassName={styles.thumb}
            trackClassName={styles.track}
            min={min}
            max={max}
            value={range}
            onChange={(newRange) => setRange(newRange as [number, number])}
            renderThumb={(props) => (
                <div
                    {...props}
                    aria-label={`${label} Range: ${props['aria-valuenow']}`}
                />
            )}
        />
        <div className={styles.rangeDisplay}>
            <span>{range[0]}</span> - <span>{range[1]}</span> {label}
        </div>
    </div>
);

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
                        max={2025}
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
