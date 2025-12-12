/**
 * dday 값을 포맷팅하는 유틸리티 함수
 * @param {string|number} dday - 마감일까지 남은 일수 ("D-0", "D-7", 0, 7 등)
 * @returns {string} 포맷팅된 dday 문자열
 */
export const formatDday = (dday) => {
  // null, undefined, 빈 문자열인 경우
  if (dday === null || dday === undefined || dday === '') return '';
  
  // 숫자 0인 경우
  if (dday === 0 || dday === '0') return '오늘 마감';
  
  // 문자열 "D-0" 또는 "d-0"인 경우
  if (typeof dday === 'string' && (dday === 'D-0' || dday === 'd-0' || dday.toLowerCase() === 'd-0')) {
    return '오늘 마감';
  }
  
  // 이미 "D-" 형식인 경우 그대로 반환
  if (typeof dday === 'string' && dday.startsWith('D-')) {
    return dday;
  }
  
  // 숫자인 경우 "D-" 형식으로 변환
  if (typeof dday === 'number') {
    return `D-${dday}`;
  }
  
  // 그 외의 경우 그대로 반환
  return dday;
};

