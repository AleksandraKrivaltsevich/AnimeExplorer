import axios from 'axios';

const API_BASE_URL = 'https://kitsu.io/api/edge';

/**
 * Базовая функция для выполнения запросов к API аниме.
 * @param {Object} params - Параметры запроса.
 * @returns {Promise<Object>} - Ответ от API (данные и метаинформация).
 */
const fetchFromApi = async (params) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/anime`, { params });
        return {
            data: response.data.data,
            meta: response.data.meta,
        };
    } catch (error) {
        console.error('Error fetching data from API:', error);
        throw error;
    }
};

/**
 * Получить список аниме с поддержкой сортировки и фильтрации.
 * @param {number} limit - Количество элементов на странице.
 * @param {number} offset - Смещение (начальный элемент).
 * @param {Object} filters - Фильтры для запроса (сортировка, параметры).
 * @returns {Promise<Object>} - Список аниме и метаинформация.
 */
export const fetchAnimeList = async (limit = 20, offset = 0, filters = {}) => {
    const allowedSorts = ['startDate', '-startDate', 'ratingRank'];
    const sort = filters.sort || '';

    if (sort && !allowedSorts.includes(sort)) {
        throw new Error(`Invalid sort parameter: ${sort}`);
    }

    const params = {
        'page[limit]': limit,
        'page[offset]': offset,
        ...filters,
    };

    return fetchFromApi(params);
};

/**
 * Найти аниме по текстовому запросу.
 * @param {string} searchQuery - Текстовый запрос.
 * @param {number} limit - Количество элементов на странице.
 * @param {number} offset - Смещение (начальный элемент).
 * @returns {Promise<Object>} - Найденные аниме и метаинформация.
 */
export const searchAnime = async (searchQuery = '', limit = 20, offset = 0) => {
    if (!searchQuery.trim()) return { data: [], meta: {} };

    const params = {
        'filter[text]': searchQuery.trim(),
        'page[limit]': limit,
        'page[offset]': offset,
    };

    return fetchFromApi(params);
};

/**
 * Получить топовые аниме по рейтингу.
 * @param {number} limit - Количество элементов на странице.
 * @param {number} offset - Смещение (начальный элемент).
 * @returns {Promise<Object>} - Топовые аниме и метаинформация.
 */
export const fetchTopRatedAnime = async (limit = 20, offset = 0) => {
    return fetchAnimeList(limit, offset, { sort: 'ratingRank' });
};

/**
 * Получить новейшие аниме по дате выхода.
 * @param {number} limit - Количество элементов на странице.
 * @param {number} offset - Смещение (начальный элемент).
 * @returns {Promise<Object>} - Новейшие аниме и метаинформация.
 */
export const fetchNewestAnime = async (limit = 20, offset = 0) => {
    return fetchAnimeList(limit, offset, { sort: '-startDate' });
};

/**
 * Получить старейшие аниме по дате выхода.
 * @param {number} limit - Количество элементов на странице.
 * @param {number} offset - Смещение (начальный элемент).
 * @returns {Promise<Object>} - Старейшие аниме и метаинформация.
 */
export const fetchOldestAnime = async (limit = 20, offset = 0) => {
    return fetchAnimeList(limit, offset, { sort: 'startDate' });
};

/**
 * Получить подробности об аниме по ID.
 * @param {string} id - Идентификатор аниме.
 * @returns {Promise<Object>} - Подробная информация об аниме.
 */
export const fetchAnimeDetails = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/anime/${id}`);
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching anime details for ID: ${id}`, error);
        throw error;
    }
};

