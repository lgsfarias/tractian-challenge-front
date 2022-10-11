import { useParams } from 'react-router-dom';

export default function Employee() {
  const { id } = useParams();
  return (
    <>
      <h1>Employee {id} </h1>
      <h2> This Page will be implemented soon </h2>
    </>
  );
}
