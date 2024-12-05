import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchAnimeList, searchAnime } from '../../services/AnimeService.js';
import AnimeFilterEpisode from '../AnimeFilterEpisode/AnimeFilterEpisode.jsx';
import AnimeFilterYear from '../AnimeFilterYear/AnimeFilterYear.jsx';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator.jsx';
import SortControls from '../SortControls/SortControls.jsx';
import AnimeCard from '../AnimeCard/AnimeCard.jsx';
import Pagination from '../Pagination/Pagination.jsx';
import styles from './AnimeList.module.css';

const AnimeList = () => {
    const [animeList, setAnimeList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(0);
    const [limit] = useState(20);
    const [error, setError] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();

    // Episode count range state
    const [episodeCountRange, setEpisodeCountRange] = useState([0, 1000]);
    const [pendingEpisodeCountRange, setPendingEpisodeCountRange] = useState([0, 1000]);

    // Year range state
    const [YearRange, setYearRange] = useState([1900, new Date() .getFullYear()]);
    const [pendingYearRange, setPendingYearRange] = useState([1900, new Date().getFullYear()]);


    const pageFromUrl = parseInt(searchParams.get('page') || '1', 10);
    const searchQuery = searchParams.get('search') || '';
    const sortOrder = searchParams.get('sort') || '';

    const loadAnime = async (page, search, sort, episodeRange, yearRange) => {
        setLoading(true);
        setError(null);
        try {
            const offset = (page) * limit;
            const filters = {};
            const [minEpisodes, maxEpisodes] = episodeRange;
            const [minYear, maxYear] = yearRange;

            if (minEpisodes !== 0 || maxEpisodes !== 1000) {
                filters['filter[episodeCount]'] = `${minEpisodes}..${maxEpisodes}`;
            }
            if (minYear !== 1907 || maxYear !== new Date().getFullYear() + 5) {
                filters['filter[year]'] = `${minYear}..${maxYear}`;
            }

            let result;
            if (search.trim()) {
                result = await searchAnime(search, limit, offset);
            } else {
                result = await fetchAnimeList(limit, offset, {
                    ...filters,
                    sort: sort,
                });
            }

            if (result?.data) {
                setAnimeList(result.data);
                setTotalPages(Math.ceil(result.meta?.count / limit) || 1);
            } else {
                setError('Unexpected response structure.');
            }
        } catch (err) {
            console.error('Error fetching anime list:', err);
            setError('Failed to load anime. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAnime(pageFromUrl, searchQuery, sortOrder, episodeCountRange, YearRange);
    }, [pageFromUrl, searchQuery, sortOrder, episodeCountRange, YearRange]);

    const applyFilters = () => {
        setEpisodeCountRange(pendingEpisodeCountRange);
        setYearRange(pendingYearRange);
        setSearchParams({
            page: 1,
            search: searchQuery,
            sort: sortOrder,
            episodes: pendingEpisodeCountRange.join('..'),
            years: pendingYearRange.join('..'),
        })
    };

    const changePage = (newPage) => {
        if (newPage <= 0 || newPage > totalPages) return;
        setSearchParams({
            page: newPage,
            search: searchQuery,
            sort: sortOrder,
            episodes: episodeCountRange.join('..'),
            years: YearRange.join('..'),
        });
    };

    const changeSort = (newSort) => {
        setSearchParams({
            page: 1,
            search: searchQuery,
            sort: newSort,
            episodes: episodeCountRange.join('..'),
            years: YearRange.join('..'),
        });
    };

    if (loading) return <LoadingIndicator />;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2 className={styles.header2}>Anime List</h2>
            <AnimeFilterEpisode
                pendingEpisodeCountRange={pendingEpisodeCountRange}
                setPendingEpisodeCountRange={setPendingEpisodeCountRange}
                applyFilters={applyFilters}
            />

            <AnimeFilterYear
                pendingYearRange={pendingYearRange}
                setPendingYearRange={setPendingYearRange}
                applyFilters={applyFilters}
            />

            <SortControls sortOrder={sortOrder} changeSort={changeSort} />

            <div className={styles.animeList}>
                {animeList.map((anime) => (
                    <AnimeCard key={anime.id} anime={anime} />
                ))}
                {animeList.length === 0 && <p>No anime found.</p>}
            </div>

            <Pagination currentPage={pageFromUrl} totalPages={totalPages} onPageChange={changePage} />
        </div>
    );
};

export default AnimeList;
