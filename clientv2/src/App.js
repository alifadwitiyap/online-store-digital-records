import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import InputBarangBaru from './pages/InputBarangBaru';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/input-barang-baru" element={<InputBarangBaru />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
