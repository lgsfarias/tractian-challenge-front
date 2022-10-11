import { useParams,useNavigate } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';
import api from '../../services/api';
import useAuth from '../../hooks/useAuth';
import useAlert from '../../hooks/useAlert';
import useCompany from '../../hooks/useCompany';
import {useState,useEffect} from 'react';
import { Asset } from '../../interfaces';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Space, Table, Tag , Button, Typography, Modal} from 'antd';
import LoadingPage from '../../components/LoadingPage';

const {confirm} = Modal;
const { Title } = Typography

interface DataType {
  key: string;
  name: string;
  description: string;
  model: string;
  responsable: string;
  status: string;
  health: number;

}

export default function Unit() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const {setMessage} = useAlert();
  const { updateCompany } = useCompany();
  const { id } = useParams<{ id: string }>();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  
  const showPromiseConfirm = (id: string) => {
    confirm({
      title: 'Do you want to delete these items?',
      icon: <ExclamationCircleOutlined />,
      content: "This action can't be undone",
      async onOk() {
        try {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          await api.delete(`/assets/${id}`, config);
          await getAssets();          
          updateCompany();
          setMessage({type: 'success', message: 'Asset deleted successfully'});
        } catch (error) {
          setMessage({type: 'error', message: 'Error deleting asset'});
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });

  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Model',
      dataIndex: 'model',
      key: 'model',
    },
    {
      title: 'Responsable',
      dataIndex: 'responsable',
      key: 'responsable',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status) => (
        <>
          <Tag color={status === 'Running' ? 'green' : status === 'Alerting' ? 'orange' : 'red'} key={status}>
            {status.toUpperCase()}
          </Tag>
        </>
      )
    },
    {
      title: 'Health',
      key: 'health',
      dataIndex: 'health',
      render: (health) => (
        <>
          {health}%
        </>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => navigate(`/assets/${record.key}`)}>View</Button>
          <Button danger onClick={() => showPromiseConfirm(record.key)}>Delete</Button>
        </Space>
      ),
    }
  ];

  const data: DataType[] = assets.map((asset) => {
    return {
      key: asset._id,
      name: asset.name,
      description: asset.description,
      model: asset.model,
      responsable: asset.owner.name,
      status: asset.status,
      health: asset.healthLevel,
    };
  });

  async function getAssets(){
    const response = await api.get(`/assets/by-unit/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
    setAssets(response.data);
  }

  useEffect(() => {
    (async () => {
      await getAssets();
      setLoading(false);
    })();
  }, [id]);

  return (
    !loading 
    ? <Space direction="vertical" style={{width: '100%'}}>
        <Title level={2}>Assets</Title>
        <Table columns={columns} dataSource={data}/>
      </Space>
    : <LoadingPage/>
  );
}
