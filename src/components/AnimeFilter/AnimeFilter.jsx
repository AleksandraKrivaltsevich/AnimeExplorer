import React, { useState } from 'react';
import ReactSlider from 'react-slider';
import styles from './AnimeFilter.module.css';

const AnimeFilter = ({
                         pendingEpisodeCountRange,
                         setPendingEpisodeCountRange,
                         pendingYearRange,
                         setPendingYearRange,
                         applyFilters,
                     }) => {
    const [showFilters, setShowFilters] = useState(false);

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
                            onChange={(newRange) => setPendingEpisodeCountRange(newRange)}
                            renderThumb={(props) => <div {...props}></div>}
                            ariaLabelForHandle="Episode Range"
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
                            onChange={(newRange) => setPendingYearRange(newRange)}
                            renderThumb={(props) => <div {...props}></div>}
                            ariaLabelForHandle="Year Range"
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
