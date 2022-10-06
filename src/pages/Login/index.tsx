import * as S from './style'
import { useNavigate } from 'react-router-dom';
import factory from '../../assets/factory.png'

export default function Login() {
  const navigate = useNavigate();
  
  return (
    <S.LoginWrapper>
      <div className="logo">
        <img src={factory} alt="factory" />
      </div>
      <div className="form">
        
      <h2
          className="link"
          onClick={() => navigate('/signup')}
        >
          Primeira vez? Cadastre-se!
        </h2>
      </div>
    </S.LoginWrapper>
  );
}