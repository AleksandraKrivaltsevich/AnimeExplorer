import styles from './LoadingIndicator.module.css';

const LoadingIndicator = () => {
    return (
        <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p>Loading...</p>
        </div>
    );
};

export default LoadingIndicator;
