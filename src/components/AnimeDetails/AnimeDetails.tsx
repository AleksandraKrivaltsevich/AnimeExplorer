import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';  //Link создания ссылок между страницами
import { fetchAnimeDetails } from '../../services/AnimeService';
import styles from './AnimeDetails.module.css';


interface Anime {
    id: string;
    type: string;
    attributes: {
        canonicalTitle: string;
        averageRating: string | null;
        episodeCount: number | null;
        status: 'finished' | 'ongoing' | string;
        startDate: string | null;
        endDate: string | null;
        synopsis: string | null;
        posterImage: {
            large: string;
        }
    }
}
const AnimeDetails = () => {
    const { id } = useParams<{ id: string }>(); //получить параметры из URL
    const [anime, setAnime] = useState<Anime >();
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
                console.log('Fetched anime details:', animeDetails);
                setAnime(animeDetails);
            } catch (error) {
                console.error('Error loading anime details:', error);
            } finally {
                setLoading(false);
            }
        };

        void loadAnimeDetails();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (!anime) return <p>Anime not found</p>;

    return (
        <div className={styles.detailsContainer}>
            <h2>{anime.attributes.canonicalTitle}</h2>
            <img
                src={anime.attributes.posterImage.large}
                alt={anime.attributes.canonicalTitle}
                className={styles.detailsImage}
            />
            <div className={styles.textBlock}>
                <p>{anime.attributes.synopsis}</p>
                <p>Rating: {anime.attributes.averageRating}</p>
                <p>Episodes: {anime.attributes.episodeCount}</p>
                <p>Status: {status === 'finished' ? 'Finished' : 'Ongoing'}</p>
                <p>
                    {anime.attributes.startDate && anime.attributes.endDate
                        ? `Aired from ${anime.attributes.startDate} to ${anime.attributes.endDate}`
                        : 'Airing date not available'}
                </p>
            </div>
            <Link className={styles.backLink} to="/">Back to list</Link>
        </div>
    );
};

export default AnimeDetails;
