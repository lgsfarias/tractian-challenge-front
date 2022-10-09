import { ThemeProvider } from 'styled-components';
import { AlertProvider } from './contexts/AlertContext';
import { AuthProvider } from './contexts/AuthContext';
import AlertComponent from './components/Alert';
import './App.css'
import AppRoutes from './Routes';
import * as S from './styles/global'
import theme from './styles/themes/theme';
import 'antd/dist/antd.css';
import { CompanyProvider } from './contexts/CompanyContext';

function App() {

  return (
    <ThemeProvider theme={theme}>
      <S.Reset/>
      <S.Global/>
      <AuthProvider>
        <CompanyProvider>
          <AlertProvider>
            <AppRoutes/>
            <AlertComponent/>
          </AlertProvider>
        </CompanyProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App