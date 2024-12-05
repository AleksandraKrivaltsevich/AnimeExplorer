import ReactSlider from 'react-slider';
import styles from './AnimeFilterYear.module.css';

const AnimeFilterYear = ({
                             pendingYearRange,
                             setPendingYearRange,
                             applyFilters,
                         }) => {
    return (
        <div className={styles.filterControls}>
            <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>Year:</label>
                <ReactSlider
                    className={styles.slider}
                    thumbClassName={styles.thumb}
                    trackClassName={styles.track}
                    min={1907}
                    max={new Date().getFullYear() + 5}
                    value={pendingYearRange}
                    onChange={(newRange) => setPendingYearRange(newRange)}
                    renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                    renderTrack={(props) => <div {...props}></div>}
                    ariaLabelForHandle="Year Range"
                />
                <div className={styles.rangeDisplay}>
                    <span>{pendingYearRange[0]}</span> - <span>{pendingYearRange[1]}</span> Years
                </div>
            </div>

            <button className={styles.applyFilterBtn} onClick={applyFilters}>
                Apply Filters
            </button>
        </div>
    );
};

export default AnimeFilterYear;
