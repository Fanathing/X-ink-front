import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Main from './pages/Main';
import ButtonPlay from './playground/ButtonPlay';
import Header from './layouts/Header';
import TextPlay from './playground/TextPlay';
import Layout from './layouts/Layout';
import Login from './pages/Login';
import CompanyLogin from './pages/CompanyLogin';
import InputPlay from './playground/InputPlay';
import CardPlay from './playground/CardPlay';
import SearchSection from './sections/SearchSection/SearchSection';
import BreadcrumbPlay from './playground/BreadcrumbPlay';
import CardGrid from './sections/CardGrid/CardGrid';
import TextsPlay from './playground/TextsPlay';
import SpreaterPlay from './playground/SpreaterPlay';
import StepsPlay from './playground/StepsPlay';
import CheckPlay from './playground/CheckPlay';
import LabelPlay from './playground/LabelPlay';
import RadioPlay from './playground/RadioPlay';
import DropdownPlay from './playground/DropdownPlay';
import PaginationPlay from './playground/PaginationPlay';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/button" element={<ButtonPlay />} />
        <Route path="/header" element={<Header />} />
        <Route path="/text" element={<TextPlay />} />
        <Route path="/layout" element={<Layout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/company" element={<CompanyLogin />} />
        <Route path="/input" element={<InputPlay />} />
        <Route path="/card" element={<CardPlay />} />
        <Route path="/search" element={<SearchSection />} />
        <Route path="/breadcrumb" element={<BreadcrumbPlay />} />
        <Route path="/cardgrid" element={<CardGrid />} />
        <Route path="/texts" element={<TextsPlay />} />
        <Route path="/spreater" element={<SpreaterPlay />} />
        <Route path="/steps" element={<StepsPlay />} />
        <Route path="/check" element={<CheckPlay />} />
        <Route path="/label" element={<LabelPlay />} />
        <Route path="/radio" element={<RadioPlay />} />
        <Route path="/dropdown" element={<DropdownPlay />} />
        <Route path="/pagination" element={<PaginationPlay />} />


    
      </Routes>
    </BrowserRouter>
  );
}

export default App;
