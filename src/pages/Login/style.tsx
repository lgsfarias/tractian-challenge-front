import styled from 'styled-components';
import Wrapper from '../../styles/elements/Wrapper';

export const LoginWrapper = styled(Wrapper)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70vw;
  height: 70vh;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.background};
  border-radius: 10px;
  .link {
    font-size: 15px;
    font-weight: bold;
    cursor: pointer;
  }
  .logo {
    img {
      width: 100%;
      border-radius: 10px 10px 0 0;
    }}

  .form {
    display: flex;
    flex: 1;
  }
`;