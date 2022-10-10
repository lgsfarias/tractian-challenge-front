import { useParams } from 'react-router-dom';
import api from '../../services/api';
import useAuth from '../../hooks/useAuth';
import { useState,useEffect } from 'react';
import { Asset as IAsset } from '../../interfaces';
import { Image, Typography , Col , Row} from 'antd';

export default function Asset() {
  const { id } = useParams<{ id: string }>();
  const { token } = useAuth();
  const [asset, setAsset] = useState<IAsset>();

  useEffect(() => {
    (async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await api.get(`/assets/${id}`, config);
      console.log(response.data);
      setAsset(response.data);
    })();
  }, [id]);


  return (
    asset ?
    (
      <Row>
        <Col span={6}>
          <Image src={asset.image} />
        </Col>
        <Col span={18}>
          <Typography.Title level={2}>{asset.name}</Typography.Title>
          <Typography.Paragraph>{asset.description}</Typography.Paragraph>
          <Typography.Title level={5}>Model: {asset.model}</Typography.Title>
          <Typography.Title level={5}>Unit: {asset.unit.name}</Typography.Title>
          <Typography.Title level={5}>Owner: {asset.owner.name}</Typography.Title>
        </Col>
      </Row>
    ) : <h1>Loading...</h1>
  );
}