import React from 'react';
import styled from 'styled-components';

const ScExampleButton = styled.button`
  margin:0;
  padding:1rem;
  border-radius: 2rem;
  border: 1px dashed white;

  background-color:black;
  color: white;
`

class ExampleButton extends React.Component{
  render() {
    return (
      <ScExampleButton>
        { this.props.children }
      </ScExampleButton>
    )
  };
}

export default ExampleButton;
