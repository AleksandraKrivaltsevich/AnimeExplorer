import {useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchAnimeList, searchAnime } from '../../services/AnimeService';
import AnimeFilter from '../AnimeFilter/AnimeFilter';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';
import SortControls from '../SortControls/SortControls';
import AnimeCard from '../AnimeCard/AnimeCard';
import Pagination from '../Pagination/Pagination';
import styles from './AnimeList.module.css';

interface ApiResponse {
    data: Anime[];
    meta: any;
}

interface Anime {
    id: string;
    type: string;
    attributes: {
        canonicalTitle: string | null;
        status: string;
        startDate: string | null;
        posterImage: {
            medium: string ;
        };
        averageRating: string | null;

    };
}

interface Filters {
    'filter[episodeCount]'?: string;
    'filter[year]'?: string;
    sort?: string;
}


const AnimeList = () => {
    const [animeList, setAnimeList] = useState<Anime[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [limit] = useState<number>(20);
    const [error, setError] = useState<string | null>(null);
    const [searchParams, setSearchParams] = useSearchParams();

    // Filters
    const [episodeCountRange, setEpisodeCountRange] = useState<[number, number]>([0, 1000]);
    const [pendingEpisodeCountRange, setPendingEpisodeCountRange] = useState<[number, number]>([0, 1000]);
    const [yearRange, setYearRange] = useState<[number, number]>([1900, new Date().getFullYear()]);
    const [pendingYearRange, setPendingYearRange] = useState<[number, number]>([1900, new Date().getFullYear()]);

    const pageFromUrl = parseInt(searchParams.get('page') || '1', 10);
    const searchQuery = searchParams.get('search') || '';
    const sortOrder = searchParams.get('sort') || '';

    const loadAnime = async (
        page:  number,
        search: string,
        sort: string,
        episodeRange: [number, number],
        yearRange: [number, number]) => {
        setLoading(true);
        setError(null);
        try {
            const offset = (page - 1) * limit;
            const filters: Filters = {};
            const [minEpisodes, maxEpisodes] = episodeRange;
            const [minYear, maxYear] = yearRange;

            if (minEpisodes !== 0 || maxEpisodes !== 1000) {
                filters['filter[episodeCount]'] = `${minEpisodes}..${maxEpisodes}`;
            }
            if (minYear !== 1900 || maxYear !== new Date().getFullYear()) {
                filters['filter[year]'] = `${minYear}..${maxYear}`;
            }

            let result: ApiResponse ;
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
        void loadAnime(pageFromUrl, searchQuery, sortOrder, episodeCountRange, yearRange);
    }, [pageFromUrl, searchQuery, sortOrder, episodeCountRange, yearRange]);
    const applyFilters = () => {
        setEpisodeCountRange(pendingEpisodeCountRange);
        setYearRange(pendingYearRange);
        setSearchParams({
            search: searchQuery,
            sort: sortOrder,
            episodes: pendingEpisodeCountRange.join('..'),
            years: pendingYearRange.join('..'),
        });
    };

    const changePage = (newPage: number) => {
        if (newPage <= 0 || newPage > totalPages) return;
        setSearchParams({
            page: newPage.toString(),
            search: searchQuery,
            sort: sortOrder,
            episodes: episodeCountRange.join('..'),
            years: yearRange.join('..'),
        });
    };

    const changeSort = (newSort: string) => {
        setSearchParams({
            page: '1',
            search: searchQuery,
            sort: newSort,
            episodes: episodeCountRange.join('..'),
            years: yearRange.join('..'),
        });
    };


    if (loading) return <LoadingIndicator />;
    if (error) return <p>{error}</p>;


    return (
        <div>
            <h2 className={styles.header2}>Anime List</h2>
            <AnimeFilter
                pendingEpisodeCountRange={pendingEpisodeCountRange}
                setPendingEpisodeCountRange={setPendingEpisodeCountRange}
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
