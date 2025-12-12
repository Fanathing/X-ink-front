/**
 * API 서비스
 * 백엔드 API와 통신하는 함수들을 관리합니다.
 */
import { API_BASE_URL, AUTH_PREFIX } from './baseurl.config';
import { fetchAPI } from './fetch.config';

/**
 * 현재 로그인한 사용자 정보 가져오기
 * @returns {Promise<Object>} 사용자 정보
 */

// /auth/me
export const getCurrentUser = async () => {
  return await fetchAPI(`${AUTH_PREFIX}/me`);
};

/**
 * 로그아웃
 * @returns {Promise<void>}
 */
export const logout = async () => {
  return await fetchAPI(`${AUTH_PREFIX}/logout`, {
    method: 'POST',
  });
};

/**
 * 로컬 로그인
 * @param {string} email
 * @param {string} password
 * @returns {Promise<Object>}
 */
export const volunteerLogin = async (email, password) => {
  return await fetchAPI(`${AUTH_PREFIX}/volunteer-login`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
};

/**
 * 기업 로그인
 * @param {string} email
 * @param {string} password
 * @returns {Promise<Object>}
 */
export const companiesLogin = async (email, password) => {
  return await fetchAPI(`${AUTH_PREFIX}/companies-login`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
};

/**
 * 회원가입
 * @param {Object} userData
 * @returns {Promise<Object>}
 */
export const registerUser = async (userData) => {
  return await fetchAPI(`${AUTH_PREFIX}/register`, {
    method: 'POST',
    body: JSON.stringify(userData),
  });
};

/**
 * 카카오 로그인 콜백 처리
 * @param {string} code - 카카오 인증 코드
 * @returns {Promise<Object>}
 */
export const kakaoLoginCallback = async (code) => {
  return await fetchAPI(`${AUTH_PREFIX}/kakao/callback?code=${code}`);
};

/**
 * 백엔드 서버 연결 상태 확인 (헬스체크)
 * @returns {Promise<boolean>}
 */
export const checkServerHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      credentials: 'include',
    });
    console.log('✅ 서버 연결 성공:', response.status);
    return response.ok;
  } catch (error) {
    console.error('❌ 서버 연결 실패:', error.message);
    return false;
  }
};

/**
 * 전체 공고 목록 가져오기
 * @returns {Promise<Array>} 공고 목록
 */
export const getJobs = async () => {
  return await fetchAPI('/jobs', {
    method: 'GET',
  });
};

/**
 * 필터링된 공고 목록 가져오기
 * @param {Object} filters - 필터 옵션
 * @param {string} filters.position - 포지션 필터 (예: "프론트엔드", "백엔드")
 * @param {string} filters.status - 상태 필터 (예: "OPEN", "CLOSE")
 * @returns {Promise<Array>} 공고 목록
 */
export const getJobsFiltered = async (filters = {}) => {
  const queryParams = new URLSearchParams();

  if (filters.position) queryParams.append('position', filters.position);
  if (filters.status) queryParams.append('status', filters.status);

  const queryString = queryParams.toString();
  const endpoint = queryString ? `/jobs?${queryString}` : '/jobs';

  return await fetchAPI(endpoint, {
    method: 'GET',
  });
};

/**
 * 개별 공고 상세 정보 가져오기
 * @param {number} jobId - 공고 ID
 * @returns {Promise<Object>} 공고 상세 정보
 */
export const getJobById = async (jobId) => {
  return await fetchAPI(`/jobs/detail/${jobId}`, {
    method: 'GET',
  });
};

/**
 * 공고 지원하기
 * @param {number} jobId - 공고 ID (URL 파라미터로 전달)
 * @param {Object} applicationData - 지원서 데이터 (name, email, phone_number, position, intro 등)
 * @returns {Promise<Object>} 지원 결과
 */
export const applyToJob = async (jobId, applicationData) => {
  return await fetchAPI(`/jobapplications/${jobId}`, {
    method: 'POST',
    body: JSON.stringify(applicationData),
  });
};

/**
 * 내가 지원한 공고 목록 가져오기
 * @returns {Promise<Array>} 지원한 공고 목록
 */
export const getMyApplications = async () => {
  console.log('📞 getMyApplications - API 함수 호출');
  try {
    const result = await fetchAPI('/jobapplications', {
      method: 'GET',
    });
    console.log('📞 getMyApplications - API 함수 완료, 결과:', result);
    return result;
  } catch (error) {
    console.error('📞 getMyApplications - API 함수 에러:', error);
    throw error;
  }
};

/**
 * 전체 개인 유저(구직자) 목록 가져오기
 * @returns {Promise<Array>} 개인 유저 목록
 */
export const getVolunteers = async () => {
  return await fetchAPI('/jobapplications/volunteers', {
    method: 'GET',
  });
};

/**
 * 지원자 목록 가져오기 (기업용 - 내 공고에 지원한 volunteer 목록)
 * @returns {Promise<Array>} 지원자(volunteer) 목록
 */
export const getApplicants = async () => {
  return await fetchAPI('/jobapplications/check', {
    method: 'GET',
  });
};

export default {
  getCurrentUser,
  logout,
  volunteerLogin,
  companiesLogin,
  registerUser,
  kakaoLoginCallback,
  checkServerHealth,
  getJobs,
  getJobsFiltered,
  getJobById,
  applyToJob,
  getMyApplications,
  getVolunteers,
  getApplicants,
};
