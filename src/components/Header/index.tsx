import useAuth from '../../hooks/useAuth';
import useCompany from '../../hooks/useCompany';
import { useNavigate } from 'react-router-dom';
import {LogoutOutlined} from '@ant-design/icons';
import { Layout } from 'antd';
import logo from '../../assets/logo.svg';


const {Header} = Layout;

export default function AppHeader() {
  const { signOut } = useAuth();
  const { setAssets,setEmployees,setUnits } = useCompany();
  const navigate = useNavigate();

  return (
    <Header className="site-layout-" style={{ zIndex:'9' , position:'sticky' , top:'0' , padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <img 
          src={logo} 
          alt="logo" 
          style={{
            height: '20px',

          }}/>
          <LogoutOutlined 
          style={{
            color: '#fff',
            fontSize: '20px',
            cursor: 'pointer',
          }}
          onClick={
            () => {
              signOut();
              setAssets([]);
              setEmployees([]);
              setUnits([]);
              navigate('/');
            }
          }
          />
        </Header>
  );
}