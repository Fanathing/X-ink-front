import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Main from './pages/Main';
import ButtonPlay from './playground/ButtonPlay';
import Header from './layouts/Header';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/button' element={<ButtonPlay />} />
        <Route path='/header' element={<Header />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
