import { useEffect, useState } from 'react';
import Layout from '../layouts/Layout';
import JobsCreateForm from '../components/Jobs/JobsCreateForm';
import JobsSetting from '../components/Jobs/JobsSetting';
import axios from 'axios';

const Jobs = () => {
  const [loading, setLoading] = useState(true);
  const [jobExists, setJobExists] = useState(null);

  // 공고가 있으면 true 없으면 false
  useEffect(() => {
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
  }, []);

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
