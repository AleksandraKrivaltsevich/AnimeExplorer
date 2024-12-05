import { Link } from 'react-router-dom';
import styles from './AnimeCard.module.css';
import React from 'react';

interface Anime {
    id: string;
    attributes: {
        titles: {
            en: string | null;
            canonicalTitle: string | null;
        };
        posterImage: {
            medium: string | null;
        };
        averageRating: string | null;
        startDate: string | null;
    };
}

interface AnimeCardProps {
    anime: Anime;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ anime }) => {
    const posterImage = anime.attributes.posterImage?.medium || '/path/to/default-image.jpg';
    const title = anime.attributes.titles.en || anime.attributes.titles.canonicalTitle || 'No Title';
    const rating = anime.attributes.averageRating || 'N/A';
    const startDate = anime.attributes.startDate || 'Unknown';

    return (
        <div className={styles.animeCard}>
            <img
                src={posterImage}
                alt={title}
                className={styles.animeImage}
            />
            <h3>{title}</h3>
            <p>Rating: {rating}</p>
            <p>Start Date: {startDate}</p>
            <Link to={`/anime/${anime.id}`} className={styles.detail}>
                View Details
            </Link>
        </div>
    );
};

export default AnimeCard;
