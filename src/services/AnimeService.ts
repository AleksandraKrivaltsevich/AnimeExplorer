import axios, { AxiosResponse } from 'axios';

const API_BASE_URL = 'https://kitsu.io/api/edge';

interface ApiResponse<T> {
    data: T[];
    meta: Record<string, any>;
}

interface AnimeAttributes {
    titles: { en: string };
    synopsis: string;
    status: string;
    startDate: string;
    endDate: string | null;
    ratingRank: number | null;
}

interface Anime {
    id: string;
    type: string;
    attributes: AnimeAttributes;
}

interface FetchAnimeListParams {
    'page[limit]': number;
    'page[offset]': number;
    [key: string]: any;
}

const fetchFromApi = async <T>(params: FetchAnimeListParams): Promise<ApiResponse<T>> => {
    try {
        const response: AxiosResponse<ApiResponse<T>> = await axios.get(`${API_BASE_URL}/anime`, { params });
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
): Promise<ApiResponse<Anime>> => {
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

    return fetchFromApi<Anime>(params);
};

// Функция для поиска аниме по текстовому запросу
export const searchAnime = async (
    searchQuery: string = '',
    limit: number = 20,
    offset: number = 0
): Promise<ApiResponse<Anime>> => {
    if (!searchQuery.trim()) return { data: [], meta: {} };

    const params: FetchAnimeListParams = {
        'filter[text]': searchQuery.trim(),
        'page[limit]': limit,
        'page[offset]': offset,
    };

    return fetchFromApi<Anime>(params);
};

// Исправленная функция получения деталей аниме
export const fetchAnimeDetails = async (id: string): Promise<Anime> => {
    try {
        const response: AxiosResponse<{ data: Anime }> = await axios.get(`${API_BASE_URL}/anime/${id}`);
        console.log('API response:', response.data); // Логируем весь ответ
        return response.data.data; // Здесь мы возвращаем объект из data
    } catch (error) {
        console.error(`Error fetching anime details for ID: ${id}`, error);
        throw error;
    }
};
