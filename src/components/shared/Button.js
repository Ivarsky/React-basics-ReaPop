import styled from 'styled-components';

const accentColor = 'rgb(29, 161, 242)';

const Button = styled.button`
  cursor: pointer;
  background-color: ${accentColor}
  border-radius: 9999px;
  border-style: solid;
  border-width: 1px;
  border-color: ${accentColor};
  color: ${accentColor};
  display: inline-flex;
  align-items: center;
  font: inherit;
  font-weight: bold;
  min-height 36px;
  justify-content: center;
  min-width: 72px;
  outline-style: none;
  opacity: 1;
  padding: 0 30px;
  text-decoration: none;
  
  &:hover{
    background-color: 
  }
`;

export default Button;
