import api from "../../services/api"
import useAuth from "../../hooks/useAuth"
import useCompany from "../../hooks/useCompany"
import { useState } from "react"
import { Button, Form, Input, Select, Typography } from "antd"
import useAlert from "../../hooks/useAlert"
import { AxiosError } from "axios"
const { Title } = Typography
const { Option } = Select

export default function NewEmployee() {
  const { setMessage } = useAlert();
  const { token ,companyId } = useAuth();
  const { units,updateEmployees } = useCompany();
  const [disabled, setDisabled] = useState(false);

  const onFinish = async (values: any) => {
    setDisabled(true);
    try {
      await api.post('/employees', values, 
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
      updateEmployees();
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
      name="add_employee"
      className="add_employee"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      disabled={disabled}
    >
      <Title level={1} className='title' >New Employee</Title>
      <Form.Item
        name="unit"
        rules={[{ required: true, message: 'Please select a unit!' }]}
      >
        <Select placeholder="Select a unit">
          {units.map(unit => (
            <Option key={unit._id} value={unit._id}>{unit.name}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="name"
        rules={[{ required: true, message: 'Please input the name!' }]}
      >
        <Input placeholder="Name" />
      </Form.Item>
      <Form.Item>
        <Button 
          type="primary" 
          htmlType="submit" 
          className="add_employee-form-button"
          loading={disabled}
        >
          Add Employee
        </Button>
      </Form.Item>
    </Form>
  )
}