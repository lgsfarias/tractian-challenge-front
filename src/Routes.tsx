import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Company from './pages/Company';
import Home from './pages/Home';
import Login from './pages/Login';
import NewUnit from './pages/NewUnit';
import SignUp from './pages/SignUp';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/home" element={<Dashboard children={<Home/>}/>} />
        <Route path="/companies/:id" element={<Dashboard children={<Company/>}/>} />
        <Route path="/units/new" element={<Dashboard children={<NewUnit/>} />} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </Router>
  );
}