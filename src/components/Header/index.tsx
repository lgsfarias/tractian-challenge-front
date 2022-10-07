import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import {LogoutOutlined} from '@ant-design/icons';
import { Layout } from 'antd';

const {Header} = Layout;

export default function AppHeader() {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <Header className="site-layout-" style={{  padding: '10px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
          <LogoutOutlined 
          style={{
            color: '#fff',
            fontSize: '20px',
            cursor: 'pointer',
          }}
          onClick={
            () => {
              signOut();
              navigate('/');
            }
          }
          />
        </Header>
  );
}