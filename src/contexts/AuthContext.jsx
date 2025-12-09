// AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser } from '../services/api';

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
      // 원본 데이터 그대로 저장 (정규화 최소화)
      const normalizedUser = {
        role: userData.type, // "companies" | "volunteers"
        ...userData.data, // NAME, EMAIL 등 평탄화
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
    setUser(userData);
    setLoading(false);
  };

  // 임시 로그아웃
  const logout = () => {
    console.warn('⚠ 임시 로그아웃 (백엔드 미구현)');
    setUser(null);
  };

  useEffect(() => {
    loadUser();
  }, []);

  // role 추출 (다양한 구조 지원)
  const role = user?.role || user?.type || null;
  
  const isCompany = role === 'companies';
  const isIndividual = role === 'volunteers';
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
