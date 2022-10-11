import * as S from './style'
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import useAlert from '../../hooks/useAlert';
import useAuth from '../../hooks/useAuth';
import useCompany from '../../hooks/useCompany';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { Typography } from 'antd'
import { AxiosError } from 'axios';

const { Title } = Typography;

export default function Login() {
  const navigate = useNavigate();
  const { setMessage } = useAlert();
  const { login } = useAuth();
  const { updateCompany} = useCompany();


  const onFinish = async (values: any) => {
    try {
      const {
        data: { token , companyId },
      } = await api.post('/login', values);
      login(token, companyId);
      await updateCompany();
      navigate('/home');
    } catch (error: Error | AxiosError | any) {
      if(error.response) {
        setMessage({
          type: 'error',
          message: error.response.data.message,
        });
      };
    };
  };

  
  return (
    <S.LoginWrapper>
      <div className="logo"/>
      <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Title level={1} className='title' >Login</Title>
      <Form.Item
        name="email"
        rules={[{ type:'email', required: true, message: 'Please input a valid Email!' }]}
      >
        <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email"/>
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
      </Form.Item>
      <Title level={5} onClick={() => navigate('/signup')} style={{
        color: '#1890ff',
        cursor: 'pointer',
        textDecoration: 'underline',
      }}>
        Sign Up
      </Title>
    </Form>
    </S.LoginWrapper>
  );
}