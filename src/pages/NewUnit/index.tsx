import api from "../../services/api"
import useAuth from "../../hooks/useAuth"
import { useState } from "react"
import { Button, Form, Input, Typography } from "antd"
import useAlert from "../../hooks/useAlert"
import { AxiosError } from "axios"
const { Title } = Typography

export default function NewUnit() {
  const { setMessage } = useAlert();
  const { token ,companyId } = useAuth();
  const [disabled, setDisabled] = useState(false);

  const onFinish = async (values: any) => {
    setDisabled(true);
    try {
      await api.post('/units', {
        ...values,
        company:companyId,
      }, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage({
        type: 'success',
        message: 'Unit created successfully',
      })
      setDisabled(false);
    } catch (error: Error | AxiosError | any) {
      if(error.response) {
        setMessage({
          type: 'error',
          message: error.response.data.message,
        });
      };
      setDisabled(false);
    };
  };

  return (
    <Form
      name="add_unit"
      className="add_unit-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      disabled={disabled}
    >
      <Title level={1} className='title' >New Unit</Title>
      <Form.Item
        name="name"
        rules={[{ required: true, message: 'Por favor insira o nome da unidade!' }]}
      >
        <Input placeholder="Unit's name"/>
      </Form.Item>
      <Form.Item>
        <Button 
          type="primary" 
          htmlType="submit" 
          className="login-form-button"
          loading={disabled}
        >
          Add Unit
        </Button>
      </Form.Item>
    </Form>
  )
}