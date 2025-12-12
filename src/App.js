import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Main from './pages/Main';
import Login from './pages/Login';
import CompanyLogin from './pages/CompanyLogin';
import { AuthProvider } from './contexts/AuthContext';
import JoinStep1 from './pages/JoinStep1';
import JoinStep2 from './pages/JoinStep2';
import JoinStep3 from './pages/JoinStep3';
import Jobs from './pages/Jobs';
import JobApplyForm from './pages/JobApplyForm';
import JobApplicantSearch from './pages/JobApplicantSearch';
import ApplicantManagement from './pages/ApplicantManagement';

// Playground imports (개발/테스트용)
import ButtonPlay from './playground/ButtonPlay';
import TextPlay from './playground/TextPlay';
import InputPlay from './playground/InputPlay';
import CardPlay from './playground/CardPlay';
import BreadcrumbPlay from './playground/BreadcrumbPlay';
import TextsPlay from './playground/TextsPlay';
import SpreaterPlay from './playground/SpreaterPlay';
import StepsPlay from './playground/StepsPlay';
import CheckPlay from './playground/CheckPlay';
import LabelPlay from './playground/LabelPlay';
import RadioPlay from './playground/RadioPlay';
import DropdownPlay from './playground/DropdownPlay';
import PaginationPlay from './playground/PaginationPlay';
import ProfilePlay from './playground/ProfilePlay';
import HeaderTestPlay from './playground/HeaderTestPlay';
import IconPlay from './playground/IconPlay';
import CompaniesHeader from './playground/CompaniesHeader';
import VolunteerHeader from './playground/VolunteerHeader';
import Detail from './pages/Detail';
import JobsComplete from './pages/JobsComplete';
import JobApplyComplete from './pages/JobApplyComplete';
import JobApply from './pages/jobApply';
import MyApplications from './pages/MyApplications';
import VolunteerProfile from './pages/VolunteerProfile';
import CompaniesProfile from './pages/CompaniesProfile';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* 메인 페이지 */}
          <Route path="/" element={<Main />} />

          {/* 로그인 페이지 */}
          <Route path="/volunteer-login" element={<Login />} />
          <Route path="/companies-login" element={<CompanyLogin />} />

          {/* 회원가입 페이지 */}
          <Route path="/join/step1" element={<JoinStep1 />} />
          <Route path="/join/step2" element={<JoinStep2 />} />
          <Route path="/join/step3" element={<JoinStep3 />} />

          {/* 공고 관리 페이지 */}
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/complete" element={<JobsComplete />} />

          {/* 공고 지원하기 페이지 */}
          <Route path="/jobapplyform/:id" element={<JobApplyForm />} />
          <Route
            path="/jobapplyform/complete/:id"
            element={<JobApplyComplete />}
          />
          <Route path="/jobapply/:id" element={<JobApply />} />

          {/* 지원자 관리 페이지 */}
          <Route
            path="/applicantmanagement"
            element={<ApplicantManagement />}
          />

          {/* 구직자 검색 페이지 */}
          <Route path="/jobapplicantsearch" element={<JobApplicantSearch />} />

          {/* 내가 지원한 공고 관리 페이지 */}
          <Route path="/myapplications" element={<MyApplications />} />

          {/* 일반 회원 프로필 관리 */}
          <Route path="/volunteer-profile" element={<VolunteerProfile />} />
          <Route path="/companies-profile" element={<CompaniesProfile />} />

          {/* TODO: 추가 예정 페이지들 */}
          {/* <Route path="/signup" element={<Signup />} /> */}
          {/* <Route path="/profile" element={<ProfilePage />} /> */}
          {/* <Route path="/job-management" element={<JobManagement />} /> */}
          {/* <Route path="/applicant-management" element={<ApplicantManagement />} /> */}
          {/* <Route path="/search" element={<JobSearch />} /> */}

          {/* Playground 라우트 (개발/테스트용) */}
          <Route path="/button" element={<ButtonPlay />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/text" element={<TextPlay />} />
          <Route path="/input" element={<InputPlay />} />
          <Route path="/card" element={<CardPlay />} />
          <Route path="/breadcrumb" element={<BreadcrumbPlay />} />
          <Route path="/texts" element={<TextsPlay />} />
          <Route path="/spreater" element={<SpreaterPlay />} />
          <Route path="/steps" element={<StepsPlay />} />
          <Route path="/check" element={<CheckPlay />} />
          <Route path="/label" element={<LabelPlay />} />
          <Route path="/radio" element={<RadioPlay />} />
          <Route path="/dropdown" element={<DropdownPlay />} />
          <Route path="/pagination" element={<PaginationPlay />} />
          <Route path="/profile" element={<ProfilePlay />} />
          <Route path="/header-test" element={<HeaderTestPlay />} />
          <Route path="/icon" element={<IconPlay />} />
          <Route path="/companies-header" element={<CompaniesHeader />} />
          <Route path="/volunteer-header" element={<VolunteerHeader />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
