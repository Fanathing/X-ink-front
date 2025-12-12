import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
  
const StyledDetail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: 1260px;
  margin: 0 auto;

  & > .detail-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    gap: 10px;
    height: 36px;
    align-self: stretch;
  }

  & > .detail-company-name {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 0px;
    gap: 10px;

    align-self: stretch;
  }

  & > .detail-company-info {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    gap: 10px;

    align-self: stretch;
  }

  & > .detail-job-info {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 0px;
    gap: 29px;

    & > .detail-company-info-img {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 0px;
      gap: 10px;
      width: 350px;
      height: 300px;
      flex: none;

      img {
        width: 350px;
        height: 125px;
 
      }
    }

    & > .card-content {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 20px;
      gap: 20px;
      width: 881px;
      height: 479px;
      background: #ffffff;
      border: 1.5px solid #03407e;
      filter: drop-shadow(3px 3px 7px #03407e);
      border-radius: 4px;
      flex: none;
      flex-grow: 1;

      & > .card-info-header {
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        padding: 0px;
        gap: 10px;
      }

      & > .card-position {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        padding: 0px;
        gap: 10px;
      }

      & > .card-deadline {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        padding: 0px;
        gap: 10px;
      }

      & > .card-description {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        padding: 0px;
        gap: 10px;
        width: 841px;
        height: 120px;
        align-self: stretch;
      }
    }
  }
`;

const Detail = () => {
  const { id } = useParams();
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
    return description.split('\n').filter(line => line.trim());
  };

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        setError(null);
        const jobData = await getJobById(id);
        
        // 현재 로그인한 사용자의 companyLogoURL 가져오기 (기업 로그인인 경우)
        const currentUserLogoURL = user?.LOGO_URL || user?.logoUrl || user?.companyLogoURL || null;
        const currentUserId = user?.id || user?.ID || user?.companyId || null;
        const currentUserName = user?.NAME || user?.name || user?.companyName || null;
        
        // 기업 로고 URL 결정:
        // 1. jobData.companyLogoURL (백엔드에서 직접 제공)
        // 2. 현재 로그인한 사용자가 해당 공고의 기업 소유자인 경우에만 user.LOGO_URL 사용
        //    - companyId로 매칭 (우선)
        //    - companyName으로 매칭 (companyId가 없는 경우)
        // 3. 기본 이미지
        if (!jobData.companyLogoURL && currentUserLogoURL) {
          let isMatch = false;
          
          // 방법 1: companyId로 매칭 (가장 정확)
          if (jobData.companyId && currentUserId) {
            isMatch = String(jobData.companyId) === String(currentUserId);
          }
          // 방법 2: companyName으로 매칭 (companyId가 없는 경우 - 백엔드 수정 필요)
          else if (jobData.companyName && currentUserName) {
            isMatch = jobData.companyName === currentUserName;
          }
          
          if (isMatch) {
            jobData.companyLogoURL = currentUserLogoURL;
          }
        }
        
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
        <StyledDetail>
          <Text>공고 정보를 불러오는 중...</Text>
        </StyledDetail>
      </Layout>
    );
  }

  if (error || !job) {
    return (
      <Layout>
        <StyledDetail>
          <Text color="red">{error || '공고 정보를 찾을 수 없습니다.'}</Text>
        </StyledDetail>
      </Layout>
    );
  }

  const descriptionLines = parseJobDescription(job.jobDescription);

  return (
    <Layout>
      <StyledDetail>
        <div className="detail-header">
          <Breadcrumb
            items={[
              { label: '전체 공고 목록', link: '/' },
              { label: job.title },
            ]}
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
         <Text 
            variant="title" 
            color={formatDday(job.dday) === '오늘 마감' ? 'red' : 'red'} 
            size="16px"
          >
            {formatDday(job.dday)}
            </Text>
          <Text variant="title" size="16px" color="#838383">
            {getStatusText(job.status)}
          </Text>
        </div>
        <div className="detail-job-info">
          <div className="detail-company-info-img">
            <img 
              src={job.companyLogoURL || job.company?.logoUrl || job.company?.LOGO_URL || defaultImage} 
              alt="company logo" 
            />
          </div>
          <div className="card-content">
            <Text variant="title">{job.title}</Text>
            <Spreater variant="thin" />
            <div className="card-position">
              <Text variant="subtitle">포지션</Text>
              <Button variant="sky-outline" disabled>
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
          </div>
        </div>
      </StyledDetail>
    </Layout>
  );
};

export default Detail;
