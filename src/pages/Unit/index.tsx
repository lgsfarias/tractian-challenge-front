import { useParams } from 'react-router-dom';
import { Space, Table, Tag , Button, Typography} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import api from '../../services/api';
import useAuth from '../../hooks/useAuth';
import {useState,useEffect} from 'react';
import { Asset } from '../../interfaces';

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
        <Button type="primary" onClick={() => console.log(record)}>Details</Button>
        <Button onClick={() => console.log(record)}>Edit</Button>
        <Button danger onClick={() => console.log(record)}>Delete</Button>
      </Space>
    ),
  }
];



export default function Unit() {
  const { token } = useAuth();
  const { id } = useParams<{ id: string }>();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    (async () => {
      const response = await api.get(`/assets/by-unit/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setAssets(response.data);
      setLoading(false);
    })();
  }, [id]);

  return (
    !loading 
    ? <Space direction="vertical" style={{width: '100%'}}>
        <Title level={2}>Assets</Title>
        <Table columns={columns} dataSource={data}/>
      </Space>
    : <h1>Loading...</h1>
  );
}
