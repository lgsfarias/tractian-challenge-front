import api from "../../services/api"
import useAuth from "../../hooks/useAuth"
import useCompany from "../../hooks/useCompany"
import { useEffect, useState } from "react"
import { User } from "../../interfaces"
import { Typography } from "antd"

const { Title } = Typography

export default function Home() {
  const { token } = useAuth()
  const [user, setUser] = useState<User>();
  const { employees, units,assets ,updateAssets,updateEmployees,updateUnits} = useCompany();

  useEffect(() => {
    (async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await api.get('/users/show-data', config);
      await updateEmployees();
      await updateUnits();
      await updateAssets();
      setUser(response.data);
    })();
  }, []);


  return (
    user ? 
    (<>
      <Title level={2}>Welcome {user.name}</Title>
      <h2>Company: {user.company.name}</h2>
      <h2>Units: {units.length}</h2>
      <h2>Employees: {employees.length}</h2>
      <h2>Assets: {assets.length}</h2>
    </>) : <h1>Loading...</h1>

  )
}