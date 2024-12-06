import axios, { AxiosResponse } from 'axios';

const API_BASE_URL = 'https://kitsu.io/api/edge';


interface ApiResponse {
    data: Anime[];
    meta: Record<string, any>;
}

interface Anime {
    id: string;
    type: string;
    attributes:{
        titles: {
            en: string | null;
            canonicalTitle: string;
        };
        episodeCount: number | null;
        synopsis: string | null;
        status: 'finished' | 'ongoing' | string;
        startDate: string | null;
        endDate: string | null;
        ratingRank: number | null;
        posterImage: {
            large: string;
            medium: string;
        };
        averageRating: string | null;
    }
}

interface FetchAnimeListParams {
    'page[limit]': number;
    'page[offset]': number;
    [key: string]: any;
}

const fetchFromApi = async (params: FetchAnimeListParams): Promise<ApiResponse> => {
    try {
        const response: AxiosResponse<ApiResponse> =
            await axios.get(`${API_BASE_URL}/anime`, { params });
        return {
            data: response.data.data,
            meta: response.data.meta,
        };
    } catch (error) {
        console.error('Error fetching data from API:', error);
        throw error;
    }
};

// Функция для получения списка аниме
export const fetchAnimeList = async (
    limit = 20,
    offset = 0,
    filters: Partial<FetchAnimeListParams> = { 'page[limit]': limit, 'page[offset]': offset }
): Promise<ApiResponse> => {
    const allowedSorts = ['startDate', '-startDate', 'ratingRank'];
    const sort = filters.sort || '';

    // Validate sort parameter
    if (sort && !allowedSorts.includes(sort)) {
        throw new Error(`Invalid sort parameter: ${sort}`);
    }

    const params: FetchAnimeListParams = {
        'page[limit]': limit,
        'page[offset]': offset,
        ...filters,
    };

    return fetchFromApi(params);
};

// Функция для поиска аниме по текстовому запросу
export const searchAnime = async (
    searchQuery: string = '',
    limit: number = 20,
    offset: number = 0
): Promise<ApiResponse> => {
    if (!searchQuery.trim()) return { data: [], meta: {} };

    const params: FetchAnimeListParams = {
        'filter[text]': searchQuery.trim(),
        'page[limit]': limit,
        'page[offset]': offset,
    };

    return fetchFromApi(params);
};

// Исправленная функция получения деталей аниме
export const fetchAnimeDetails = async (id: string) => {
    try {
        const response: AxiosResponse<{ data: Anime }> =
            await axios.get(`${API_BASE_URL}/anime/${id}`);
        console.log('API response:', response.data); // Логируем весь ответ
        return response.data.data; // Здесь мы возвращаем объект из data
    } catch (error) {
        console.error(`Error fetching anime details for ID: ${id}`, error);
        throw error;
    }
};