import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Layout from '../layouts/Layout';
import Breadcrumb from '../components/Navigation/Breadcrumb';
import Text from '../components/Texts/Text';
import Label from '../components/Labels/Label';
import Spreater from '../components/Spreater/Spreater';
import Button from '../components/Buttons/Button';
import defaultImage from '../assets/images/image.png';
import { getJobById } from '../services/api';
import { formatDday } from '../utils/formatDday';
import { useAuth } from '../contexts/AuthContext';

const StyledJobApply = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  gap: 20px;
  width: 100%;

  & > .detail-header {
    align-self: flex-start;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    height: 36px;
  }
  & > .detail-company-name {
    align-self: flex-start;
  }
  & > .detail-company-info {
    align-self: flex-start;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
  }
  & > .detail-job-info {
    align-self: flex-start;
    display: flex;
    gap: 29px;

    & > .detail-company-info-img {
      width: 350px;
      height: 300px;

      img {
        width: 100%;
        height: 100%;
      }
    }
    & > .card-content {
      width: 881px;
      height: 413px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 20px;
      align-items: flex-start;
      justify-content: flex-start;
      border: 1.5px solid #03407e;
      box-shadow: 3px 3px 7px 0px #03407e;

      & > .card-position {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 10px;
      }
      & > .card-deadline {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 10px;
      }
      & > .card-description {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 10px;
      }
      & > .card-apply-button > button {
        display: flex;
        width: 841px;
        gap: 20px;
        padding: 16px 0;
        border-radius: 4px;
      }
    }
  }
`;
const JobApply = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  // status를 한글로 변환
  const getStatusText = (status) => {
    return status === 'OPEN' ? '모집중' : '모집마감';
  };

  // deadline을 한국어 형식으로 변환
  const formatDeadline = (deadline) => {
    if (!deadline) return '';
    const date = new Date(deadline);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}년 ${month}월 ${day}일`;
  };

  // jobDescription을 줄별로 분리
  const parseJobDescription = (description) => {
    if (!description) return [];
    return description.split('\n').filter((line) => line.trim());
  };

  const handleApply = () => {
    navigate(`/jobapplyform/${id}`);
  };

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        setError(null);
        const jobData = await getJobById(id);
        
        console.log('🔍 JobApply.jsx - 이미지 로딩 확인:', {
          jobId: id,
          jobDataCompanyLogoURL: jobData.companyLogoURL,
          jobDataLogoURL: jobData.logoURL,
          jobDataLogo: jobData.logo,
          jobDataCompanyId: jobData.companyId,
          jobDataCompanyName: jobData.companyName,
          jobDataAllKeys: Object.keys(jobData), // 모든 키 확인
          userRole: user?.role,
          userObject: user,
        });
        
        // 기업 로고 URL 결정:
        // 1. jobData.companyLogoURL (백엔드에서 직접 제공) - 가장 우선
        // 2. jobData.logoURL, jobData.logo (다른 필드명 시도)
        // 3. 기본 이미지
        // 주의: 로그인한 사용자가 해당 기업 소유자인 경우에만 user.LOGO_URL을 사용하는 로직 제거
        // 백엔드에서 각 공고의 companyLogoURL을 제공해야 함
        let logoURL = jobData.companyLogoURL || jobData.logoURL || jobData.logo || null;
        
        // jobData에 최종 로고 URL 설정
        jobData.companyLogoURL = logoURL;
        
        console.log('✅ JobApply.jsx - 최종 이미지 URL:', jobData.companyLogoURL || '기본 이미지 사용');
        
        setJob(jobData);
      } catch (err) {
        console.error('❌ 공고 상세 정보 로드 실패:', err);
        setError('공고 정보를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchJob();
    }
  }, [id, user]); // user 정보가 변경될 때마다 다시 로드 (새로고침 시 user 로드 후 job 재처리)

  if (loading) {
    return (
      <Layout>
        <StyledJobApply>
          <Text>공고 정보를 불러오는 중...</Text>
        </StyledJobApply>
      </Layout>
    );
  }

  if (error || !job) {
    return (
      <Layout>
        <StyledJobApply>
          <Text color="red">{error || '공고 정보를 찾을 수 없습니다.'}</Text>
        </StyledJobApply>
      </Layout>
    );
  }

  const descriptionLines = parseJobDescription(job.jobDescription);

  return (
    <Layout>
      <StyledJobApply>
        <div className="detail-header">
          <Breadcrumb
            items={[{ label: '전체 공고 목록', link: '/' }, { label: job.title }]}
            weight="700"
            size="30px"
          />
        </div>
        <div className="detail-company-name">
          <Text variant="title" className="text-left">
            {job.companyName}
          </Text>
        </div>
        <div className="detail-company-info">
          <Label variant="primary">{job.position}</Label>
          <Text>({job.volunteerCount || 0}명 지원)</Text>
          <Text variant="title" color="red">
            {formatDday(job.dday)}
          </Text>
          <Text variant="title">{getStatusText(job.status)}</Text>
        </div>
        <div className="detail-job-info">
          <div className="detail-company-info-img">
            <img 
              src={job.companyLogoURL || defaultImage} 
              alt="company logo" 
            />
          </div>
          <div className="card-content">
            <Text variant="title">{job.title}</Text>
            <Spreater variant="thin" />
            <div className="card-position">
              <Text variant="subtitle">포지션</Text>
              <Button
                border={'1px solid #2C6AA9'}
                radius={'4px'}
                color={'#2c6aa9'}
                backgroundColor={'#ffffff'}
              >
                {job.position}
              </Button>
            </div>
            <div className="card-deadline">
              <Text variant="subtitle">마감일</Text>
              <Text variant="content">{formatDeadline(job.deadline)}</Text>
            </div>
            <div className="card-description">
              <Text variant="subtitle">업무설명</Text>
              {descriptionLines.length > 0 ? (
                descriptionLines.map((line, index) => (
                  <Text key={index} variant="content">
                    {line.trim() ? ` · ${line.trim()}` : line}
                  </Text>
                ))
              ) : (
                <Text variant="content"> · 업무 설명이 없습니다.</Text>
              )}
            </div>
            <div className="card-apply-button">
              <Button variant="sky" onClick={handleApply}>
                지원하기
              </Button>
            </div>
          </div>
        </div>
      </StyledJobApply>
    </Layout>
  );
};

export default JobApply;
