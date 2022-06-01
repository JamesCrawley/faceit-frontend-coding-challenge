import styled from 'styled-components';
import theme from '../theme';

const Padding = styled.div`
  padding-top: ${({ top }) => theme.spacing(top)};
  padding-right: ${({ right }) => theme.spacing(right)};
  padding-bottom: ${({ bottom }) => theme.spacing(bottom)};
  padding-left: ${({ left }) => theme.spacing(left)};
`;

export default Padding;
