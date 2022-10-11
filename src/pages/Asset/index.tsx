import { useParams,useNavigate } from 'react-router-dom';
import api from '../../services/api';
import useAuth from '../../hooks/useAuth';
import useAlert from '../../hooks/useAlert';
import useCompany from '../../hooks/useCompany';
import { useState,useEffect } from 'react';
import { Asset as IAsset } from '../../interfaces';
import {ExclamationCircleOutlined} from '@ant-design/icons';
import { Image , Col , Row, Space, Descriptions, Progress, Tag, Button, Modal} from 'antd';
import NewAsset from '../NewAsset';
import EditAssetModal from '../../components/EditAssetModal';
import LoadingPage from '../../components/LoadingPage';

const {confirm} = Modal;

export default function Asset() {
  const { id } = useParams<{ id: string }>();
  const { token } = useAuth();
  const { setMessage } = useAlert();
  const { updateCompany } = useCompany();
  const navigate = useNavigate();
  const [asset, setAsset] = useState<IAsset>();
  const [modalVisible, setModalVisible] = useState(false);

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
          navigate('/home');     
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

  async function getAsset() {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await api.get(`/assets/${id}`, config);
      setAsset(response.data);
    } catch (error) {
      setMessage({type: 'error', message: 'Error loading asset'});
    }
  }

  const showModal = () => {
    setModalVisible(true);
  };
  

  useEffect(() => {
    (async () => {
      await getAsset();
    })();
  }, [id]);


  return (
    asset ?
    (
      <Space direction="vertical" style={{width: '100%', marginTop:"20px"}}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Descriptions title="Asset info" bordered >
              <Descriptions.Item label="Image" span={24}>
                <Image src={asset.image} about="image" height="300px" />
              </Descriptions.Item>
              <Descriptions.Item label="Name" span={24}>{asset.name}</Descriptions.Item>
              <Descriptions.Item label="Model" span={24}>{asset.model}</Descriptions.Item>
              <Descriptions.Item label="Description" span={24}>{asset.description}</Descriptions.Item>
              <Descriptions.Item label="Unit" span={24}>{asset.unit.name}</Descriptions.Item>
              <Descriptions.Item label="Owner" span={24}>{asset.owner.name}</Descriptions.Item>
              <Descriptions.Item label="Status" span={24}>
                <Tag
                  color={asset.status === 'Running' ? 'green' : 
                    asset.status === 'Stopped' ? 'red' : 'orange'}
                >
                  {asset.status}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Health" span={24}>
                <Progress percent={asset.healthLevel} status="active" />
              </Descriptions.Item>
              <Descriptions.Item label="Actions" span={24}>
                <Space>
                  <Button type="primary" onClick={showModal}>Edit</Button>
                  <Button type="primary" danger 
                    onClick={() => {
                      showPromiseConfirm(asset._id);
                    }
                  }>Delete</Button>
                  <EditAssetModal asset={asset} modalVisible={modalVisible} setModalVisible={setModalVisible} getAsset={getAsset}/>
                </Space>
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
      </Space>
    ) : <LoadingPage/>
  );
}