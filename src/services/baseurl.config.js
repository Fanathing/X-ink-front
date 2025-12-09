export const API_BASE_URL = process.env.REACT_APP_BACK_URL || 'https://api.x-ink.store';
// API 경로 설정
// 백엔드가 API 명세서대로 구현하면 '/api/auth'로 변경
export const AUTH_PREFIX = '/auth'; // 현재: /auth  |  나중: /api/auth