// AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, logout as logoutAPI } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadUser = async () => {
    try {
      setLoading(true);
      setError(null);
      const userData = await getCurrentUser();

      // userData 구조에 따라 정규화
      // getCurrentUser 응답: { type: "volunteers"|"companies", data: {...} } 또는 { userType: "individual"|"company", ... }
      let role = null;
      let userInfo = {};
      

      // 응답 구조 1: { type, data }
      if (userData.type) {
        role = userData.type; // "companies" | "volunteers"
        userInfo = userData.data || {};
        
      }
      // 응답 구조 2: 직접 사용자 정보 (로그인 응답과 동일)
      else if (userData.userType) {
        role =
          userData.userType === 'individual'
            ? 'volunteers'
            : userData.userType === 'company'
              ? 'companies'
              : null;
        userInfo = { ...userData };
        
      }
      // 응답 구조 3: 이미 role이 있는 경우
      else if (userData.role) {
        role = userData.role;
        userInfo = { ...userData };
      }

      const normalizedUser = {
        ...userInfo,
        role,
        
      };

      setUser(normalizedUser);
    } catch (err) {
      if (err.message === 'UNAUTHORIZED') {
        setUser(null);
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const login = (userData) => {
    // 로그인 시에도 데이터를 정규화하여 저장
    // userType을 role로 변환하는 로직 포함
    const normalizedUser = {
      ...userData,
      // userType이 있으면 role로 변환
      role:
        userData.role ||
        userData.type ||
        (userData.userType === 'individual'
          ? 'volunteers'
          : userData.userType === 'company'
            ? 'companies'
            : null),
    };
    setUser(normalizedUser);
    setLoading(false);
  };

  // 로그아웃
  const logout = async () => {
    try {
      console.log('🚪 로그아웃 요청 시작');
      await logoutAPI();
      console.log('✅ 로그아웃 성공');
      setUser(null);
    } catch (err) {
      console.error('❌ 로그아웃 실패:', err);
      // 에러가 발생해도 프론트엔드에서는 로그아웃 처리
      setUser(null);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  // role 추출 (다양한 구조 지원)
  // userType을 role로 매핑: "individual" -> "volunteers", "company" -> "companies"
  let rawRole = user?.role || user?.type || null;
  if (!rawRole && user?.userType) {
    rawRole =
      user.userType === 'individual'
        ? 'volunteers'
        : user.userType === 'company'
          ? 'companies'
          : null;
  }

  // 단수형도 복수형으로 정규화 (백엔드에서 "volunteer" 또는 "company"로 올 수 있음)
  let normalizedRole = rawRole;
  if (rawRole === 'volunteer') normalizedRole = 'volunteers';
  if (rawRole === 'company') normalizedRole = 'companies';

  // role은 정규화된 형태로 반환 (Jobs.jsx에서 "companies" 체크, JobApplyForm에서 "volunteer" 체크)
  let role = normalizedRole;
  if (normalizedRole === 'volunteers') role = 'volunteer'; // JobApplyForm 호환성을 위해 단수형으로 변환
  // 'companies'는 그대로 유지 (Jobs.jsx에서 'companies' 체크)

  const isCompany = normalizedRole === 'companies';
  const isIndividual = normalizedRole === 'volunteers';
  const isKakaoUser = user?.provider === 'kakao' || user?.PROVIDER === 'kakao';

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        role,
        isAuthenticated: !!user,
        isCompany,
        isIndividual,
        isKakaoUser,
        login,
        logout,
        refresh: loadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export default AuthContext;
