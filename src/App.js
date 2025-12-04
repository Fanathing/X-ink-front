import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Main from './pages/Main';
import ButtonPlay from './playground/ButtonPlay';
import Header from './layouts/Header';
import TextPlay from './playground/TextPlay';
import Layout from './layouts/Layout';
import InputPlay from './playground/InputPlay';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/button" element={<ButtonPlay />} />
        <Route path="/header" element={<Header />} />
        <Route path="/text" element={<TextPlay />} />
        <Route path="/layout" element={<Layout />} />
        <Route path="/input" element={<InputPlay />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
