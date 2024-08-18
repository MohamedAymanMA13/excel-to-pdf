import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SideMenu from './components/SideMenu/SideMenu';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure this is imported
import '@popperjs/core';
import 'bootstrap/dist/js/bootstrap.bundle.min'
import ExcelToPdf from './pages/ExcelToPdf';
import InputToPdf from './pages/InputToPdf'

function App() {
  return (
    <div className="App" dir='rtl'>
      <Router>
        <div className="row m-0">
          <div className="col-2 p-0 transition-05 d-md-block d-none SideMenu">
            <SideMenu />
          </div>
          <div className="col-md-10 Dashboard transition-05" id="">
            <div className="d-none d-xs-none d-sm-none d-md-block d-lg-block d-xl-block d-xxl-block">
              {/* NavBar component can be added here if needed */}
            </div>
            <Routes>
              {/* member */}
              <Route path="/home" element={<ExcelToPdf />} />
              <Route path="/home2" element={<InputToPdf />} />
              <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
