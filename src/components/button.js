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

function Button() {
  return (
    <ScButton>
      {'Button'}
    </ScButton>
  );
}

export default Button;
