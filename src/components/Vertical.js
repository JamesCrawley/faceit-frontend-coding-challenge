import styled from 'styled-components';

const Vertical = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: ${({ gap }) => gap}px;
`;

export default Vertical;
