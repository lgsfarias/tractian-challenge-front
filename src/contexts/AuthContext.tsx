import { createContext,useState } from 'react';
import usePersistedState from '../hooks/usePersistedState';

interface AuthContextInterface {
  companyId: string | null;
  token: string | null;
  login: (token: string, companyId: string) => void;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextInterface | null>(null);

interface Props {
  children: React.ReactNode;
}

const TOKEN_KEY = 'tractian-token';
const COMPANY_ID_KEY = 'tractian-company-id';

export function AuthProvider({ children }: Props) {
  const [token, setToken] = usePersistedState(TOKEN_KEY, null);
  const [companyId, setCompanyId] = usePersistedState(COMPANY_ID_KEY, null);

  function login(empToken: string, companyId: string) {
    setToken(empToken);
    setCompanyId(companyId);
  }

  function signOut() {
    setToken(null);
    setCompanyId(null);
  }

  return (
    <AuthContext.Provider value={{ token, login, signOut, companyId }}>
      {children}
    </AuthContext.Provider>
  );
}
