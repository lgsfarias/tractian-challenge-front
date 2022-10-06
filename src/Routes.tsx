import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Login from './pages/Login';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<h1>Signup</h1>} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </Router>
  );
}