import api from "../../services/api"
import useAuth from "../../hooks/useAuth"
import { useEffect, useState } from "react"
import { User } from "../../interfaces"
import { Typography } from "antd"

const { Title } = Typography

export default function Home() {
  const { token } = useAuth()
  const [user, setUser] = useState<User>();

  useEffect(() => {
    (async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await api.get('/users/show-data', config);
      setUser(response.data);
    })();
  }, []);


  return (
    user ? 
    (<>
      <Title level={2}>Welcome {user.name}</Title>
      <h2>Company: {user.company.name}</h2>
    </>) : <h1>Loading...</h1>

  )
}