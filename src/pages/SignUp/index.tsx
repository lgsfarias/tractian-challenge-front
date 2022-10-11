import * as S from '../Login/style'
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import useAlert from '../../hooks/useAlert';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select } from 'antd';
import { Typography } from 'antd'
import { AxiosError } from 'axios';

const { Title } = Typography;
const { Option } = Select;

export default function SignUp() {
  const navigate = useNavigate();
  const { setMessage } = useAlert();
  const [companies, setCompanies] = useState([]);

  const onFinish = async (values: any) => {
    try {
      await api.post('/signup', values);
      setMessage({ type: 'success', message: 'User created successfully' });
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

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get('/companies');
        setCompanies(response.data);
      } catch (error: Error | AxiosError | any) {
        if(error.response) {
          setMessage({
            type: 'error',
            message: error.response.data.message,
          });
        };
      }
    })();
  }, []);

  
  return (
    <S.LoginWrapper>
      <div className="logo"/>
      <Form
      name="normal_register"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Title level={1} className='title' > Sign Up </Title>
      <Form.Item
        name="company"
        rules={[{ required: true, message: 'Please select a company!' }]}
      >
        <Select placeholder="Select a company">
          {companies.map((company: any) => (
            <Option key={company._id} value={company._id}>{company.name}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="name"
        rules={[{ required: true, message: 'Please input your Name!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Name"/>
      </Form.Item>
      <Form.Item
        name="email"
        rules={[{ type: "email", required: true, message: 'Please input a valid Email!' }]}
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
      <Form.Item
        name="confirmPassword"
        dependencies={['password']}
        hasFeedback
        rules={[{ 
          required: true, 
          message: 'Please confirm your Password!', },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Confirm Password"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          SIgn Up
        </Button>
      </Form.Item>
      <Title level={5} onClick={() => navigate('/')} style={{
        color: '#1890ff',
        cursor: 'pointer',
        textDecoration: 'underline',
      }}> Already have an account?
      </Title>
    </Form>
    </S.LoginWrapper>
  );
}