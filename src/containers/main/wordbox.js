import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { getColor } from '../../themes';
import { useWindowSize, useInterval } from '../utils';

const alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',' '];
const gridCols = 20;
const gridRows = 10;

const SECRET_PHRASE = 'some secret words';

const S = {};
S.WordBox = styled.div`
  position:absolute;
  left:10%;
  top:10%;
  width:80%;
  height:80%;
  border-radius:5rem;
  border:1rem solid ${getColor('blue')};
  background-color:black;

  padding:2rem;

  ul{
    width:100%;
    height:100%;
    position:relative;
    margin:0;
    font-size:3rem;

    li{
      list-style:none;
    }
  }
`;

S.Letter = styled.li`
  position:absolute;
  color:${getColor('grey')};

  ${p => p.isSecret && css`
    color: ${getColor('green')};
  `}
`;

const randoLetterPlease = () => {
  return alphabet[Math.floor(Math.random() * alphabet.length)];
};

const getIdxFromColRow = (col, row) => {
  return (row * gridCols) + col;
}

const getSecretIndicies = (secretWord, rows, cols) => {
  const startRow = Math.floor(rows / 2);
  if(secretWord.length > cols) throw `SECRET WORD IS TOO LONG WHAT HAVE YOU DONE!?!?! IT MUST BE NO MORE THAN ${gridCols} CHARACTERS`;

  const startCol = Math.floor((cols - secretWord.length) / 2);
  
  const secret = [];
  for(let c = 0; c < secretWord.length; c++){
    secret.push({
      gridIdx: getIdxFromColRow(startCol + c, startRow),
      rIdx: startRow,
      cIdx: startCol + c,
      text: secretWord[c]
    });
  };

  return secret;
}

const makeGrid = (cols, rows, foundSecrets) => {
  const newGrid = [];
  const wb = document.querySelector('#wordbox ul');
  if(!wb) return [];

  const dims = {
    width: wb.clientWidth,
    height: wb.clientHeight
  };

  const xStep = dims.width / cols;
  const yStep = dims.height / rows;
  const xStart = 0;
  const yStart = 0;

  const secretStuff = getSecretIndicies(SECRET_PHRASE, gridRows, gridCols);

  let yPos = 0;
  for(let r = 0; r < rows; r++){
    yPos = yStart + r * yStep;
    for(let c = 0; c < cols; c++){
      // predict idx, why not
      const gridIdx = newGrid.length - 1;
      let didFindSecret = false;
      // assign the letter
      let letter;
      const existingSecret = foundSecrets.find(s => s.gridIdx === gridIdx);
      if(!!existingSecret){
        letter = existingSecret.text;
        didFindSecret = true;
      }else{
        //get a new one!
        letter = randoLetterPlease();
        const randomSecretPick = secretStuff.find(s => s.gridIdx === gridIdx);
        if(!!randomSecretPick && (randomSecretPick.text === letter)){
          didFindSecret = true;
        }
      }

      newGrid.push({
        gridIdx,
        x: xStart + c * xStep,
        y: yPos,
        text: letter,
        didFindSecret
      });
    }
  }

  return newGrid;
};

function WordBox() {
  let [count, setCount] = useState(0);
  let [delay, setDelay] = useState(75);
  let [grid, setGrid] = useState([]);
  let [foundSecrets, setFoundSecrets] = useState([]);
  useWindowSize();

  useInterval(() => {
    // Your custom logic here
    const g = makeGrid(gridCols, gridRows, foundSecrets);
    setGrid(g);
    setFoundSecrets(g.filter(c => c.didFindSecret));
    setCount(count + 1);
  }, delay, foundSecrets);

  return (
    <S.WordBox id="wordbox">
      <ul>
        {grid.map((letter, i) => 
          <S.Letter key={i} isSecret={letter.didFindSecret} style={{ 'left': `${letter.x}px`, 'top': `${letter.y}px` }}>
            <span>
              {letter.text}
            </span>
          </S.Letter>
        )}
      </ul>
    </S.WordBox>
  );
}

export default WordBox;
