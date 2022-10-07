import { useParams } from 'react-router-dom';

export default function Company() {
  const { id } = useParams();
  return <h1>Company {id}</h1>;
}
