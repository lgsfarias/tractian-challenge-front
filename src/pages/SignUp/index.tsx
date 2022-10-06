import * as S from '../Login/style'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import factory from '../../assets/factory.png'
import useAlert from '../../hooks/useAlert';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { Typography } from 'antd'
import { AxiosError } from 'axios';

const { Title } = Typography;

export default function SignUp() {
  const navigate = useNavigate();
  const { setMessage } = useAlert();

  const onFinish = async (values: any) => {
    try {
      await api.post('/signup', values);
      setMessage({ type: 'success', message: 'Usuário cadastrado com sucesso!' });
      navigate('/');
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
      <div className="logo">
        <img src={factory} alt="factory" />
      </div>
      <Form
      name="normal_register"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Title level={1} className='title' > Cadastro </Title>
      <Form.Item
        name="name"
        rules={[{ required: true, message: 'Por favor insira seu nome!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Nome"/>
      </Form.Item>
      <Form.Item
        name="email"
        rules={[{ type: "email", required: true, message: 'Por favor insira seu email!' }]}
      >
        <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email"/>
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Por favor insira sua senha!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Senha"
        />
      </Form.Item>
      <Form.Item
        name="confirmPassword"
        dependencies={['password']}
        hasFeedback
        rules={[{ 
          required: true, 
          message: 'Por favor confirme sua senha!', } ,
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('As senhas não são iguais!'));
            },
          }),
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Confirmar senha"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Cadastrar
        </Button>
      </Form.Item>
      <Title level={5} onClick={() => navigate('/')} style={{
        color: '#1890ff',
        cursor: 'pointer',
        textDecoration: 'underline',
      }}> Já possui uma conta?
      </Title>
    </Form>
    </S.LoginWrapper>
  );
}