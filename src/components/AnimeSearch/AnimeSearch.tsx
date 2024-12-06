import { useState, useEffect } from 'react';
import { searchAnime } from '../../services/AnimeService';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './AnimeSearch.module.css';


interface ApiResponse {
    data: Anime[] ;
    meta: any;
}

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
        synopsis: string | null;
    };
}

const AnimeSearch = () => {
    const [animeList, setAnimeList] = useState<Anime[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search') || '';


    useEffect(() => {
        if (searchQuery) {
            void fetchAnime(searchQuery);
        }
    }, [searchQuery]);

    const fetchAnime = async (query: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const response: ApiResponse = await searchAnime(query);
            setAnimeList(response.data || []);
        } catch (err) {
            console.error('Error while searching anime:', err);
            setError('An error occurred while searching for anime.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleBack = () => {
        navigate('/');
    };

    return (
        <div className={styles.searchPage}>
            <h1>Search Results</h1>
            <button className={styles.backButton} onClick={handleBack}>Back</button>

            {isLoading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div className={styles.animeList}>
                {animeList.length > 0 ? (
                    animeList.map((anime) => (
                        <div key={anime.id} className={styles.animeCard}>
                            <img
                                src={anime.attributes.posterImage?.medium
                                    || '/path/to/default-image.jpg'}
                                alt={anime.attributes.titles?.en
                                    || anime.attributes.titles?.canonicalTitle || 'No title'}
                                className={styles.animeImage}
                            />
                            <div className={styles.animeInfo}>
                                <h3>{anime.attributes.titles?.en
                                    || anime.attributes.titles?.canonicalTitle || 'No title'}</h3>
                                <p>Rating: {anime.attributes.averageRating || 'N/A'}</p>
                                <p>Start Date: {anime.attributes.startDate || 'Unknown'}</p>
                                <p>{anime.attributes.synopsis || 'No synopsis available.'}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No anime found for "{searchQuery}".</p>
                )}
            </div>
        </div>
    );
};

export default AnimeSearch;