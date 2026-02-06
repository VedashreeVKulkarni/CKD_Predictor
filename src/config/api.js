// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const apiConfig = {
    baseURL: API_BASE_URL,
    endpoints: {
        // CT Scan endpoints
        uploadCTScan: '/api/upload',
        getCTResults: '/api/results',

        // Clinical data endpoints
        predictRF: '/api/api/predictions/rf',

        // Auth endpoints (if needed)
        login: '/api/auth/login',
        register: '/api/auth/register',
    }
};

/**
 * Helper function to build full API URL
 * @param {string} endpoint - The endpoint path
 * @returns {string} Full API URL
 */
export const getApiUrl = (endpoint) => {
    // If endpoint already starts with /api, use it as is for proxy
    if (endpoint.startsWith('/api')) {
        return endpoint;
    }
    return `${API_BASE_URL}${endpoint}`;
};

/**
 * Helper function for making API requests with proper error handling
 * @param {string} endpoint - API endpoint
 * @param {object} options - Fetch options
 * @returns {Promise} Response data
 */
export const apiRequest = async (endpoint, options = {}) => {
    const url = getApiUrl(endpoint);

    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...options.headers,
        },
    };

    const response = await fetch(url, { ...defaultOptions, ...options });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
};

export default apiConfig;
