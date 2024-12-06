
const API_BASE_URL = 'https://kitsu.io/api/edge';


interface ApiResponse {
    data: Anime[];
    meta: Record<string, any>;
}

interface Anime {
    id: string;
    type: string;
    attributes:{
        canonicalTitle: string;
        episodeCount: number | null;
        synopsis: string | null;
        status: 'finished' | 'ongoing' | string;
        startDate: string | null;
        endDate: string | null;
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
        const queryString = new URLSearchParams(params).toString();
        const response = await fetch(`${API_BASE_URL}/anime?${queryString}`);

        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const data: ApiResponse = await response.json();
        return {
            data: data.data,
            meta: data.meta,
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
    const allowedSorts = ['startDate', '-startDate', '-averageRating'];
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

export const fetchAnimeDetails = async (id: string): Promise<Anime> => {
    try {
        const response = await fetch(`${API_BASE_URL}/anime/${id}`);

        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('API response:', data); // Log the entire response
        return data.data; // Return the Anime object from the data
    } catch (error) {
        console.error(`Error fetching anime details for ID: ${id}`, error);
        throw error;
    }
};
