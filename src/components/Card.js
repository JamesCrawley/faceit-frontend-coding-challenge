import styled from 'styled-components';
import theme from '../theme';

const Card = styled.div`
  border-radius: 4px;
  background-color: ${theme.palette.background.base};
  padding: ${theme.spacing(4)};
`;

export default Card;
