import { ThemeProvider } from 'styled-components';
import './App.css'
import AppRoutes from './Routes';
import * as S from './styles/global'
import theme from './styles/themes/theme';
import 'antd/dist/antd.css';

function App() {

  return (
    <ThemeProvider theme={theme}>
      <S.Reset/>
      <S.Global/>
      <AppRoutes/>
    </ThemeProvider>
  )
}

export default App