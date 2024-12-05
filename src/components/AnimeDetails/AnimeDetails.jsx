import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchAnimeDetails } from '../../services/AnimeService.js';
import styles from './AnimeDetails.module.css'; // Импортируем стили

const AnimeDetails = () => {
    const { id } = useParams();
    const [anime, setAnime] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadAnimeDetails = async () => {
            try {
                const animeDetails = await fetchAnimeDetails(id);
                setAnime(animeDetails);
            } catch (error) {
                console.error('Error loading anime details:', error);
            } finally {
                setLoading(false);
            }
        };

        loadAnimeDetails();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (!anime) return <p>Anime not found</p>;

    const { titles, averageRating, episodeCount, status, startDate, endDate, synopsis, posterImage } = anime.attributes;

    return (
        <div className={styles.detailsContainer}>
            <h2>{titles.en || titles.canonicalTitle}</h2>
            <img
                src={posterImage.large}
                alt={titles.en}
                className={styles.detailsImage}
            />
            <div className={styles.textBlock}>
                <p>{synopsis}</p>
                <p>Rating: {averageRating}</p>
                <p>Episodes: {episodeCount}</p>
                <p>Status: {status === 'finished' ? 'Finished' : 'Ongoing'}</p>
                <p>
                    {startDate && endDate
                        ? `Aired from ${startDate} to ${endDate}`
                        : 'Airing date not available'}
                </p>

            </div>
            <Link className={styles.backLink} to="/">Back to list</Link>
        </div>
    );
};

export default AnimeDetails;
