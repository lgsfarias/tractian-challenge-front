import { createContext,useState,useEffect } from 'react';
import { Employee, Unit, Asset } from '../interfaces';
import api from '../services/api';
import { AxiosError } from 'axios';
import useAuth from '../hooks/useAuth';

interface CompanyContextInterface {
  units: Unit[];
  employees: Employee[];
  assets: Asset[];
  setUnits: (units: Unit[]) => void;
  setEmployees: (employees: Employee[]) => void;
  setAssets: (assets: Asset[]) => void;
  updateCompany: () => Promise<void>;
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

  async function updateCompany(){
    await updateUnits();
    await updateEmployees();
    await updateAssets();
  }
  
  useEffect(() => {
    (async () => {
      await updateCompany();
    })();
  }, []);

  return (
    <CompanyContext.Provider value={{ employees, units, assets, updateCompany, setEmployees, setUnits, setAssets }}>
      {children}
    </CompanyContext.Provider>
  );
}
