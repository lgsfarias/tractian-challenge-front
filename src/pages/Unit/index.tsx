import { useParams } from 'react-router-dom';

export default function Unit() {
  const { id } = useParams();
  return <h1>Unit {id}</h1>;
}
