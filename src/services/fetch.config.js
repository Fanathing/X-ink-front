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
            throw new Error('UNAUTHORIZED');
        }

        // 응답이 성공적이지 않은 경우
        if (!response.ok) {
            const error = await response.json().catch(() => ({}));

            // 상태 코드별 에러 메시지 처리
            let errorMessage = error.message || `API Error: ${response.status}`;
            
            // 400 Bad Request - 필수값 누락, 이미 지원한 공고 등
            if (response.status === 400) {
                errorMessage = error.message || '잘못된 요청입니다.';
            }
            // 403 Forbidden - 권한 없음
            else if (response.status === 403) {
                errorMessage = error.message || '권한이 없습니다.';
            }
            // 404 Not Found - 공고를 찾을 수 없음, 생년월일을 못 찾음
            else if (response.status === 404) {
                errorMessage = error.message || '요청한 리소스를 찾을 수 없습니다.';
            }
            // 500 Internal Server Error
            else if (response.status === 500) {
                errorMessage = error.message || '서버 오류가 발생했습니다.';
            }
            
            throw new Error(errorMessage);
        }

        // 204 No Content인 경우 null 반환
        if (response.status === 204) {
            return null;
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};