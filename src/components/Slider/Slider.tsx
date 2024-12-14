import React from 'react';
import ReactSlider from 'react-slider';
import styles from './Slider.module.css';

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
            renderThumb={(props) => {
                const { key, ...rest} = props;
                return (
                    <div
                        key={key}
                        {...rest}
                        aria-label={`${label} Range: ${props['aria-valuenow']}`}
                    />
                )

            }}
        />
        <div className={styles.rangeDisplay}>
            <span>{range[0]}</span> - <span>{range[1]}</span> {label}
        </div>
    </div>
);

export default Slider;
