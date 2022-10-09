import { useParams } from 'react-router-dom';

export default function Asset() {
  const { id } = useParams();
  return <h1>Asset {id}</h1>;
}
