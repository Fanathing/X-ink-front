import { useEffect } from 'react';
import Layout from '../layouts/Layout';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import ApplyInputs from '../components/JobsApplyForm/ApplyInputs';

const JobApplyForm = () => {
  const { role, isAuthenticated, loading: authLoading } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (authLoading) return;

    if (!isAuthenticated) {
      alert('로그인이 필요합니다.');
      navigate('/volunteer-login');
      return;
    }

    if (role !== 'volunteer') {
      alert('해당 페이지는 지원자 전용 페이지입니다.');
      navigate('/');
      return;
    }
  }, [authLoading, isAuthenticated, role, navigate]);

  return (
    <Layout>
      <ApplyInputs />
    </Layout>
  );
};

export default JobApplyForm;
