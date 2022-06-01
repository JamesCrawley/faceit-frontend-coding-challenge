import styled from 'styled-components';

const Horizontal = styled.div`
  display: flex;
  justify-content: ${({ justify }) => justify};
  column-gap: ${({ gap }) => gap}px;
`;

export default Horizontal;
