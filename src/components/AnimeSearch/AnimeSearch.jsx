import { useState, useEffect } from 'react';
import { searchAnime } from '../../services/AnimeService.js';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './AnimeSearch.module.css';

const AnimeSearch = () => {
    const [animeList, setAnimeList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const searchQuery = searchParams.get('search');

    useEffect(() => {
        if (searchQuery) {
            fetchAnime(searchQuery);
        }
    }, [searchQuery]);

    const fetchAnime = async (query) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await searchAnime(query);
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
                                src={anime.attributes.posterImage?.medium || '/path/to/default-image.jpg'}
                                alt={anime.attributes.titles.en || anime.attributes.canonicalTitle}
                                className={styles.animeImage}
                            />
                            <div className={styles.animeInfo}>
                                <h3>{anime.attributes.titles.en || anime.attributes.canonicalTitle}</h3>
                                <p>Rating: {anime.attributes.averageRating || 'N/A'}</p>
                                <p>Start Date: {anime.attributes.startDate || 'Unknown'}</p>
                                <p>{anime.attributes.synopsis || 'No synopsis available.'}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No anime found for &#34;{searchQuery}&#34;.</p>
                )}
            </div>
        </div>
    );
};

export default AnimeSearch;
