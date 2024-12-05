import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchAnimeDetails } from '../../services/AnimeService';
import styles from './AnimeDetails.module.css';

interface AnimeAttributes {
    titles: {
        en: string | null;
        canonicalTitle: string;
    };
    averageRating: string | null;
    episodeCount: number;
    status: 'finished' | 'ongoing' | string;
    startDate: string | null;
    endDate: string | null;
    synopsis: string;
    posterImage: {
        large: string;
    };
}

interface Anime {
    id: string;
    type: string;
    attributes: AnimeAttributes;
}

const AnimeDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [anime, setAnime] = useState<Anime | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadAnimeDetails = async () => {
            if (!id) {
                console.error('Anime ID is undefined');
                setLoading(false);
                return;
            }
            try {
                console.log('Fetching anime details for id:', id);
                const animeDetails = await fetchAnimeDetails(id);
                console.log('Fetched anime details:', animeDetails); // Логируем результат
                // @ts-ignore
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
                alt={titles.en || titles.canonicalTitle}
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
