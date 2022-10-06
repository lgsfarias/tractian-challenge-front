import * as S from './style'
import { useNavigate } from 'react-router-dom';
import factory from '../../assets/factory.png'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { Typography } from 'antd';
import styled from 'styled-components';

const { Title } = Typography;

export default function Login() {
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };
  
  return (
    <S.LoginWrapper>
      <div className="logo">
        <img src={factory} alt="factory" />
      </div>
      <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Title level={1} style={{
        textAlign: 'center',
        marginBottom: '40px'
      }}>Login</Title>
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
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
          Acessar
        </Button>
      </Form.Item>
      <Title level={5} onClick={() => navigate('/signup')} style={{
        color: '#1890ff',
        cursor: 'pointer',
        textDecoration: 'underline',
      }}>Não possui cadastro? Clique aqui
      </Title>
    </Form>
    </S.LoginWrapper>
  );
}