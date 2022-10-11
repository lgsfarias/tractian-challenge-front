import { useParams,useNavigate } from 'react-router-dom';
import type { ColumnsType } from 'antd/es/table';
import api from '../../services/api';
import useAuth from '../../hooks/useAuth';
import useAlert from '../../hooks/useAlert';
import useCompany from '../../hooks/useCompany';
import {useState,useEffect} from 'react';
import { Asset, Employee } from '../../interfaces';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Space, Table, Tag , Button, Typography, Modal} from 'antd';
import LoadingPage from '../../components/LoadingPage';

const {confirm} = Modal;
const { Title } = Typography

interface AssetDataType {
  key: string;
  name: string;
  description: string;
  model: string;
  responsable: string;
  status: string;
  health: number;

}

interface EmployeeDataType {
  key: string;
  name: string;
  totalAssets: number;
}

export default function Unit() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const {setMessage} = useAlert();
  const { updateCompany } = useCompany();
  const { id } = useParams<{ id: string }>();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  
  const showPromiseConfirmAssets = (id: string) => {
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

  const showPromiseConfirmEmployees = (id: string) => {
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
          await api.delete(`/employees/${id}`, config);
          await getEmployees();
          updateCompany();
          setMessage({type: 'success', message: 'Employee deleted successfully'});
        } catch (error) {
          setMessage({type: 'error', message: 'Error deleting employee'});
        }
      },
      onCancel() {
        console.log('Cancel');
      },
    });

  };

  const assetsColumns: ColumnsType<AssetDataType> = [
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
          <Button danger onClick={() => showPromiseConfirmAssets(record.key)}>Delete</Button>
        </Space>
      ),
    }
  ];

  const assetsData: AssetDataType[] = assets.map((asset) => {
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

  const employeesColumns: ColumnsType<EmployeeDataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Total Assets',
      dataIndex: 'totalAssets',
      key: 'totalAssets',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => navigate(`/employees/${record.key}`)}>View</Button>
          <Button danger onClick={() => showPromiseConfirmEmployees(record.key)}>Delete</Button>
        </Space>
      ),
    }
  ];

  const employeesData: EmployeeDataType[] = employees.map((employee) => {
    return {
      key: employee._id,
      name: employee.name,
      totalAssets: assets.filter((asset) => asset.owner._id === employee._id).length,
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

  async function getEmployees(){
    const response = await api.get(`/employees/by-unit/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
    setEmployees(response.data);
  }

  useEffect(() => {
    (async () => {
      await getAssets();
      await getEmployees();
      setLoading(false);
    })();
  }, [id]);

  return (
    !loading 
    ? <Space direction="vertical" style={{width: '100%'}}>
        <Title level={2}>Assets</Title>
        <Table columns={assetsColumns} dataSource={assetsData}/>
        <Title level={2}>Employees</Title>
        <Table columns={employeesColumns} dataSource={employeesData}/>
      </Space>
    : <LoadingPage/>
  );
}
