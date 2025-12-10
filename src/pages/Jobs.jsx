import { useEffect, useState } from 'react';
import Layout from '../layouts/Layout';
import JobsCreateForm from '../components/Jobs/JobsCreateForm';
import JobsSetting from '../components/Jobs/JobsSetting';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Jobs = () => {
  const [loading, setLoading] = useState(true);
  const [jobExists, setJobExists] = useState(null);
  const { role, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  console.log(role);
  console.log(isAuthenticated);

  //로그인 안 했거나 일반 회원으로 접근한 경우 차단
  useEffect(() => {
    if (authLoading) return; // 로딩 안 끝났으면 실행 금지

    if (!isAuthenticated) {
      alert('로그인이 필요합니다.');
      navigate('/companies-login');
      return;
    }

    if (role !== 'companies') {
      alert('해당 페이지는 기업 전용 페이지입니다.');
      navigate('/');
      return;
    }
  }, [authLoading, isAuthenticated, role, navigate]); // ㅈㄴ 꼬라보다가 로딩 끝나면 실행

  // 공고가 있으면 true 없으면 false
  useEffect(() => {
    if (authLoading) return;

    const JobExists = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACK_URL}/jobs/exists`,
          {
            withCredentials: true,
          },
        );

        setJobExists(res.data.exists);
      } catch (error) {
        console.error('공고가 없다:', error);
      } finally {
        setLoading(false);
      }
    };

    JobExists();
  }, [authLoading]);

  if (loading)
    return (
      <Layout>
        <div>공고목록을 확인중에 있습니다</div>
      </Layout>
    );
  return (
    <Layout>
      {jobExists === false ? <JobsCreateForm /> : <JobsSetting />}
    </Layout>
  );
};

export default Jobs;
