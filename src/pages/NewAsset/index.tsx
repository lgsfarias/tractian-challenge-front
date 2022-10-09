import api from "../../services/api"
import useAuth from "../../hooks/useAuth"
import useCompany from "../../hooks/useCompany"
import { useState } from "react"
import { Button, Form, Input, Typography } from "antd"
import useAlert from "../../hooks/useAlert"
import { AxiosError } from "axios"
const { Title } = Typography

export default function NewAsset() {
  const { setMessage } = useAlert();
  const { token ,companyId } = useAuth();
  const { updateAssets } = useCompany();
  const [disabled, setDisabled] = useState(false);

  const onFinish = async (values: any) => {
    setDisabled(true);
    try {
      await api.post('/assets', {
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
        message: 'Asset created successfully',
      })
      setDisabled(false);
      updateAssets();
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
      name="add_asset"
      className="add_asset-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      disabled={disabled}
    >
      <Title level={1} className='title' >New Asset</Title>
      <Form.Item
        name="name"
        rules={[{ required: true, message: 'Por favor insira o nome da unidade!' }]}
      >
        <Input placeholder="Asset's name"/>
      </Form.Item>
      <Form.Item>
        <Button 
          type="primary" 
          htmlType="submit" 
          className="login-form-button"
          loading={disabled}
        >
          Add Asset
        </Button>
      </Form.Item>
    </Form>
  )
}