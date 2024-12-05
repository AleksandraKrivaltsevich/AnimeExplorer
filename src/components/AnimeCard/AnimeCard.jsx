import { Link } from 'react-router-dom';
import styles from './AnimeCard.module.css';

const AnimeCard = ({ anime }) => {
    const posterImage = anime.attributes.posterImage?.medium;

    return (
        <div className={styles.animeCard}>
            <img
                src={posterImage || '/path/to/default-image.jpg'}
                alt={anime.attributes.titles.en || anime.attributes.canonicalTitle}
            />
            <h3>{anime.attributes.titles.en || anime.attributes.canonicalTitle}</h3>
            <p>Rating: {anime.attributes.averageRating || 'N/A'}</p>
            <p>Start Date: {anime.attributes.startDate || 'Unknown'}</p>
            <Link to={`/anime/${anime.id}`} className={styles.detail}>
                View Details
            </Link>
        </div>
    );
};

export default AnimeCard;
