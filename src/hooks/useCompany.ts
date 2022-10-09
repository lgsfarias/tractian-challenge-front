import { useContext } from 'react';
import { CompanyContext } from '../contexts/CompanyContext';

export default function useCompany() {
  const companyContext = useContext(CompanyContext);
  if (!companyContext) {
    throw new Error('useAuth must be used inside a CompanyContext Provider');
  }

  return companyContext;
}
