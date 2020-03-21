import React from 'react';
import styled from 'styled-components';

const ScButton = styled.button`
  margin:0;
  padding:1rem;
  border-radius: 2rem;
  border: 1px dashed white;

  background-color:black;
  color: white;
`

function Button({ children, text}) {
  return (
    <ScButton>
      {text}
      {children}
    </ScButton>
  );
}

export default Button;
