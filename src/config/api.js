// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const apiConfig = {
    baseURL: API_BASE_URL,
    endpoints: {
        // CT Scan endpoints
        uploadCTScan: '/api/predict_ct', // Updated to match ct_routes.py

        // Clinical data endpoints
        predictRF: '/api/predictions/rf', // Updated to match prediction_routes.py
        predictCNN: '/api/predictions/cnn', // Added explicit CNN prediction route if needed

        // Auth endpoints
        login: '/api/auth/login',
        register: '/api/auth/register',
        profile: '/api/auth/me'
    }
};

/**
 * Helper function to build full API URL
 * @param {string} endpoint - The endpoint path
 * @returns {string} Full API URL
 */
export const getApiUrl = (endpoint) => {
    // If endpoint already starts with http, return it
    if (endpoint.startsWith('http')) {
        return endpoint;
    }
    // Remove leading slash if both have it to avoid double slash
    const base = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
    const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    return `${base}${path}`;
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
            // Default headers
            'Accept': 'application/json',
            // Do not set Content-Type for FormData, browser sets it with boundary
            ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
            ...options.headers,
        },
    };

    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
        defaultOptions.headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(url, { ...defaultOptions, ...options });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || errorData.error || `HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API Request failed:', error);
        throw error;
    }
};

export default apiConfig;
