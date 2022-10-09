import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Asset from './pages/Asset';
import Company from './pages/Company';
import Employee from './pages/Employee';
import Home from './pages/Home';
import Login from './pages/Login';
import NewAsset from './pages/NewAsset';
import NewEmployee from './pages/NewEmployee';
import NewUnit from './pages/NewUnit';
import SignUp from './pages/SignUp';
import Unit from './pages/Unit';


export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/home" element={<Dashboard children={<Home/>}/>} />
        <Route path="/companies/:id" element={<Dashboard children={<Company/>}/>} />
        <Route path="/units/new" element={<Dashboard children={<NewUnit/>} />} />
        <Route path="/units/:id" element={<Dashboard children={<Unit/>} />} />
        <Route path="/employees/new" element={<Dashboard children={<NewEmployee/>} />} />
        <Route path="/employees/:id" element={<Dashboard children={<Employee/>} />} />
        <Route path="/assets/new" element={<Dashboard children={<NewAsset/>} />} />
        <Route path="/assets/:id" element={<Dashboard children={<Asset/>} />} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </Router>
  );
}