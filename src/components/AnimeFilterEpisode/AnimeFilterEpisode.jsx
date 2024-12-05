import ReactSlider from 'react-slider';
import styles from './AnimeFilterEpisode.module.css';

const AnimeFilterEpisode = ({
                         pendingEpisodeCountRange,
                         setPendingEpisodeCountRange,
                         applyFilters,
                     }) => {
    return (
        <div className={styles.filterControls}>
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
                    renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                    renderTrack={(props) => <div {...props}></div>}
                    ariaLabelForHandle="Episode Range"
                />
                <div className={styles.rangeDisplay}>
                    <span>{pendingEpisodeCountRange[0]}</span> - <span>{pendingEpisodeCountRange[1]}</span> Episodes
                </div>
            </div>
        </div>
    );
};

export default AnimeFilterEpisode;
