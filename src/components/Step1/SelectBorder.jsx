import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const StyledSelectBorder = styled.div`
  & {
    display: flex;
    flex-direction: row;
    gap: 50px;
  }

  & > .companies {
    border: 1px solid #dee5e8;
    width: 476px;
    height: 412px;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  & > .companies > .companies-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 354px;
  }

  & > .companies > .companies-box > img {
    width: 44.74px;
    height: 44.73px;
    margin-bottom: 10px;
  }

  & > .companies > .companies-box > div:nth-child(2) {
    font-size: 18.8px;
    font-weight: 700;
    margin-bottom: 13.8px;
    color: #3a4044;
  }

  & > .companies > .companies-box > div {
    font-size: 15px;
    font-weight: 400;
    margin-bottom: 15px;
    color: #3a4044;
  }

  & > .companies > .companies-box > div:nth-child(7) {
    margin-bottom: 25px;
  }

  & > .companies > button {
    width: 200px;
    height: 57px;
    align-self: flex-start;
    margin-left: 61px;
    background-color: #03407e;
    border: 0px solid;
    font-size: 17px;
    font-weight: 700;
    color: #ffffff;
    cursor: pointer;
    transition: background-color 0.2s ease;
    transition: color 0.2s ease;
  }

  & > .companies > button:hover {
    color: black;
    background-color: #ffffff;
  }

  & > .companies > .companies-box > div:nth-child(3) {
    width: 354px;
    height: 1px;
    background-color: #dddddd;
  }

  & > .volunteer {
    border: 1px solid #dee5e8;
    width: 476px;
    height: 412px;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  & > .volunteer > .volunteer-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 354px;
  }

  & > .volunteer > .volunteer-box > img {
    width: 44.74px;
    height: 44.73px;
    margin-bottom: 10px;
  }

  & > .volunteer > .volunteer-box > div:nth-child(2) {
    font-size: 18.8px;
    font-weight: 700;
    margin-bottom: 13.8px;
    color: #3a4044;
  }

  & > .volunteer > .volunteer-box > div {
    font-size: 15px;
    font-weight: 400;
    margin-bottom: 15px;
    color: #3a4044;
  }

  & > .volunteer > .volunteer-box > div:nth-child(7) {
    margin-bottom: 25px;
  }

  & > .volunteer > button {
    width: 200px;
    height: 57px;
    align-self: flex-start;
    margin-left: 61px;
    background-color: #03407e;
    border: 0px solid;
    font-size: 17px;
    font-weight: 700;
    color: #ffffff;
    cursor: pointer;
    transition: background-color 0.2s ease;
    transition: color 0.2s ease;
  }

  & > .volunteer > button:hover {
    color: black;
    background-color: #ffffff;
  }

  & > .volunteer > .volunteer-box > div:nth-child(3) {
    width: 354px;
    height: 1px;
    background-color: #dddddd;
  }
`;

const JoinStep1 = () => {
  const navigate = useNavigate();

  // 버튼이 온클릭으로 type 매개변수를 던져줌
  const handleSelect = (type) => {
    navigate(`/join/step2?type=${type}`);
  };

  return (
    <StyledSelectBorder className="select-border">
      <div className="companies">
        <div className="companies-box">
          <img src="/img/companies_img.png" />
          <div>기업 회원</div>
          <div className="line"></div>
          <div>· 채용 공고 및 인재 요건 등록</div>
          <div>· 전문 헤드헌터 매칭 및 후보자 추천</div>
          <div>· 인터뷰 일정 조율 및 진행 관리</div>
          <div>· 채용 완료 후 결과 피드백 지원</div>
        </div>
        <button onClick={() => handleSelect('companies')}>등록</button>
      </div>
      <div className="volunteer">
        <div className="volunteer-box">
          <img src="/img/volunteer_img.png" />
          <div>개인 회원</div>
          <div className="line"></div>
          <div>· 경력 및 희망 직무 정보 등록</div>
          <div>· 전문 컨설턴트 매칭 및 기업 추천</div>
          <div>· 인터뷰 일정 조율 및 결과 안내</div>
          <div>· 개인정보 보호 및 이력 관리 지원</div>
        </div>
        <button onClick={() => handleSelect('volunteer')}>등록</button>
      </div>
    </StyledSelectBorder>
  );
};

export default JoinStep1;
