import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/dashboard" element={<h1>Dashboard</h1>} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </Router>
  );
}