import { createContext,useState,useEffect } from 'react';
import { Employee, Unit, Asset } from '../interfaces';
import api from '../services/api';
import { AxiosError } from 'axios';
import useAuth from '../hooks/useAuth';

interface CompanyContextInterface {
  units: Unit[];
  employees: Employee[];
  assets: Asset[];
  updateUnits: () => Promise<void>;
  updateEmployees: () => Promise<void>;
  updateAssets: () => Promise<void>;
}

export const CompanyContext = createContext<CompanyContextInterface | null>(null);

interface Props {
  children: React.ReactNode;
}

export function CompanyProvider({ children }: Props) {
  const { token, companyId } = useAuth();
  const [units, setUnits] = useState<Unit[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  async function updateUnits(){
    try{
      const response = await api.get(`/units/company/${companyId}`, config)
      setUnits(response.data);
    } catch (error: Error | AxiosError | any) {
      console.log(error);
    };
  }

  async function updateEmployees(){
    try{
      const response = await api.get(`/employees/by-company/${companyId}`, config)
      setEmployees(response.data);
    } catch (error: Error | AxiosError | any) {
      console.log(error);
    };
  }

  async function updateAssets(){
    try{
      const response = await api.get(`/assets/by-company/${companyId}`, config)
      setAssets(response.data);
    } catch (error: Error | AxiosError | any) {
      console.log(error);
    };
  }
  
  useEffect(() => {
    (async () => {
      await updateUnits();
      await updateEmployees();
      await updateAssets();
    })();
  }, []);

  return (
    <CompanyContext.Provider value={{ employees, units, assets, updateEmployees, updateUnits , updateAssets}}>
      {children}
    </CompanyContext.Provider>
  );
}
