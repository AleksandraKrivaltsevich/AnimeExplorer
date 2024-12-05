import React, { useState } from 'react';
import ReactSlider from 'react-slider';
import styles from './AnimeFilter.module.css';

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
                    {/* Episode Range Filter */}
                    <div className={styles.filterGroup}>
                        <label className={styles.filterLabel}>Episodes:</label>
                        <ReactSlider
                            className={styles.slider}
                            thumbClassName={styles.thumb}
                            trackClassName={styles.track}
                            min={0}
                            max={1000}
                            value={pendingEpisodeCountRange}
                            onChange={(newRange: [number, number]) => setPendingEpisodeCountRange(newRange)}
                            renderThumb={(props) => {
                                const { key, ...restProps } = props;
                                return (
                                    <div
                                        key={key}
                                        {...restProps}
                                        aria-label={`Episode Range: ${restProps['aria-valuenow']}`}
                                    />
                                );
                            }}
                        />
                        <div className={styles.rangeDisplay}>
                            <span>{pendingEpisodeCountRange[0]}</span> -{' '}
                            <span>{pendingEpisodeCountRange[1]}</span> Episodes
                        </div>
                    </div>

                    {/* Year Range Filter */}
                    <div className={styles.filterGroup}>
                        <label className={styles.filterLabel}>Years:</label>
                        <ReactSlider
                            className={styles.slider}
                            thumbClassName={styles.thumb}
                            trackClassName={styles.track}
                            min={1900}
                            max={new Date().getFullYear() + 2}
                            value={pendingYearRange}
                            onChange={(newRange: [number, number]) => setPendingYearRange(newRange)}
                            renderThumb={(props) => {
                                const { key, ...restProps } = props;
                                return (
                                    <div
                                        key={key}
                                        {...restProps}
                                        aria-label={`Year Range: ${restProps['aria-valuenow']}`}
                                    />
                                );
                            }}
                        />
                        <div className={styles.rangeDisplay}>
                            <span>{pendingYearRange[0]}</span> -{' '}
                            <span>{pendingYearRange[1]}</span> Years
                        </div>
                    </div>

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
