import React from 'react';
import logo from './assets/logo.svg';
import sampleGif from './assets/loading.gif';
import Button from '../../components/button';
import styled, { keyframes } from 'styled-components';

const AppLogoSpin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const ScAppLogo = styled.img`
  height: 30vmin;
  pointer-events: none;

  animation: ${AppLogoSpin} infinite 20s linear;
`

const ScHeader = styled.header`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`

const ScAppLink = styled.a`
  color: #61dafb;
`


function Example() {
  return (
    <div>
      <ScHeader>
        <ScAppLogo src={logo} alt="logo" />
        <ScAppLogo src={sampleGif} alt="gifffo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Button text={'Button Text'} />
        <ScAppLink
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer">
          {'Learn React'}
        </ScAppLink>
      </ScHeader>
    </div>
  );
}

export default Example;
