import { createContext,useState,useEffect } from 'react';
import { Employee, Unit } from '../interfaces';
import api from '../services/api';
import { AxiosError } from 'axios';
import useAuth from '../hooks/useAuth';

interface CompanyContextInterface {
  units: Unit[];
  employees: Employee[];
  updateUnits: () => void;
  updateEmployees: () => void;
}

export const CompanyContext = createContext<CompanyContextInterface | null>(null);

interface Props {
  children: React.ReactNode;
}

export function CompanyProvider({ children }: Props) {
  const { token, companyId } = useAuth();
  const [units, setUnits] = useState<Unit[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  function updateUnits(){
    api.get(`/units/company/${companyId}`, config)
      .then((response) => {
        setUnits(response.data);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  }

  function updateEmployees(){
    api.get(`/employees/by-company/${companyId}`, config)
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  }
  
  useEffect(() => {
    updateUnits();
    updateEmployees();
  }, []);

  return (
    <CompanyContext.Provider value={{ employees, units, updateEmployees, updateUnits }}>
      {children}
    </CompanyContext.Provider>
  );
}
