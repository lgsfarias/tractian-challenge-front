import api from "../../services/api"
import useAuth from "../../hooks/useAuth"
import useCompany from "../../hooks/useCompany"
import { useState, useEffect } from "react"
import { Button, Form, Input, Typography,Radio, Slider,Select,Space , Modal} from "antd"
import useAlert from "../../hooks/useAlert"
import { AxiosError } from "axios"
import { Asset, Employee } from "../../interfaces"
const { Title } = Typography

interface Props {
  asset: Asset;
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
  getAsset: () => Promise<void>;
}

export default function EditAssetModal({asset, modalVisible, setModalVisible, getAsset}: Props) {
  const { setMessage } = useAlert();
  const { token ,companyId } = useAuth();
  const { updateCompany, units,employees } = useCompany();
  const [disabled, setDisabled] = useState(false);
  const [unit, setUnit] = useState(asset.unit._id);
  const [form] = Form.useForm();

  const [confirmLoading, setConfirmLoading] = useState(false);

  const status = [
    'Running',
    "Alerting",
    'Stopped',
  ]

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };

  const handleOk = async (values: any) => {
    setDisabled(true);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await api.put(`/assets/${asset._id}`, form.getFieldsValue(), config);
      setMessage({type: 'success', message: 'Asset updated successfully'});
      updateCompany();
      await getAsset();
      setDisabled(false);
      setModalVisible(false);
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

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setModalVisible(false);
  };

  useEffect(() => {
    form.setFieldsValue({
      image: asset?.image,
      name: asset?.name,
      model: asset?.model,
      description: asset?.description,
      status: asset?.status,
      healthLevel: asset?.healthLevel,
      unit: asset?.unit._id,
      owner: asset?.owner._id,
    }
    )
  }, [asset])


  return (
    <Modal
      title="Edit Asset"
      open={modalVisible}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      onCancel={handleCancel}
    >
    <Form
      {...layout}
      form={form}
      name="add_asset"
      className="add_asset-form"
      initialValues={
        {
          image: asset?.image,
          name: asset?.name,
          model: asset?.model,
          description: asset?.description,
          status: asset?.status,
          healthLevel: asset?.healthLevel,
          unit: asset?.unit._id,
          owner: asset?.owner._id,
        }
      }
      disabled={disabled}
    >
      <Form.Item
        name='image'
        label='Image URL'
        rules={[{required: true, message: 'Please input the image!' },{type:'url', message: 'Please input a valid URL!'}]}
      >
        <Input placeholder="Image"/>
      </Form.Item>

      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: 'Por favor insira o nome da unidade!' }]}
      >
        <Input placeholder="Asset's name"/>
      </Form.Item>
      <Form.Item
        name="model"
        label="Model"
        rules={[{ required: true, message: 'Por favor insira o modelo do ativo!' }]}
      >
        <Input placeholder="Asset's model"/>
      </Form.Item>
      <Form.Item
        name="description"
        label="Description"
        rules={[{ required: true, message: 'Por favor insira a descrição da unidade!' }]}
      >
        <Input placeholder="Asset's description"/>
      </Form.Item>
      <Form.Item
        name="status"
        label="Status"
        rules={[{ required: true, message: 'Por favor insira o status do ativo!' }]}
      >
        <Radio.Group
        >
          {status.map((item) => (
            <Radio.Button value={item} key={item}>{item}</Radio.Button>
          ))}
        </Radio.Group>
      </Form.Item>
      <Form.Item
        name="healthLevel"
        label="Health Level (%)"
        rules={[{ required: true, message: 'Por favor insira o nível de saúde do ativo!' }]}
      >
        <Slider
          marks={
            {
              0: '0%',
              100: '100%',
          }
          }
        />
      </Form.Item>
      <Form.Item
        name="unit"
        label="Unit"
        rules={[{ required: true, message: 'Por favor insira a unidade do ativo!' }]}
      >
        <Select
          placeholder="Select a unit"
          allowClear
          onChange={(value) => setUnit(value)}
        >
          {units.map((item) => (
            <Select.Option value={item._id} key={item._id} >{item.name}</Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="owner"
        label="Responsible"
        rules={[{ required: true, message: 'Por favor insira o responsável pelo ativo!' }]}
      >
        <Select
          placeholder={unit ? "Select a responsible" : "Select a unit first"}
          allowClear
        >
          {employees.filter((employee: Employee) => employee.unit._id === unit).map((item) => (
            <Select.Option value={item._id} key={item._id}>{item.name}</Select.Option>
          ))}
        </Select>
      </Form.Item>

      {/* <Form.Item {...tailLayout}>
        <Space>
        <Button 
          type="primary" 
          htmlType="submit" 
          className="login-form-button"
          loading={disabled}
        >
          Submit
        </Button>
        <Button
          htmlType="button"
          onClick={onReset}
          className="login-form-button"
          loading={disabled}
        >
          Reset
        </Button>
        </Space>
      </Form.Item> */}
    </Form>
    </Modal>
  )
}