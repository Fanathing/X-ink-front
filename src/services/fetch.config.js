import { API_BASE_URL } from './baseurl.config';

/**
 * API 요청을 위한 기본 fetch 래퍼
 */
export const fetchAPI = async (endpoint, options = {}) => {
    const config = {
        ...options,
        credentials: 'include', // 쿠키를 자동으로 포함
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    };

    const fullURL = `${API_BASE_URL}${endpoint}`;

    try {
        const response = await fetch(fullURL, config);

        // 401 Unauthorized - 로그인 필요
        if (response.status === 401) {
            console.error('❌ 401 Unauthorized: 인증 필요');
            throw new Error('UNAUTHORIZED');
        }

        // 응답이 성공적이지 않은 경우
        if (!response.ok) {
            console.error('❌ API 에러:', response.status, response.statusText);
            const error = await response.json().catch(() => ({}));
            console.error('❌ 에러 상세:', error);
            throw new Error(error.message || `API Error: ${response.status}`);
        }

        // 204 No Content인 경우 null 반환
        if (response.status === 204) {
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};