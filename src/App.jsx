//228 334 1533

import './App.css';

import { useState, createContext, useEffect } from 'react'

import Board from './components/Board.jsx';
import Keyboard from './components/Keyboard.jsx';

import { boardDefault } from './Words';

import { generateWordSet } from './Words';

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault)
  const [currentAttempt, setCurrentAttempt ] = useState({attempt: 0, letterPos: 0})
  const [wordSet, setWordSet] = useState(new Set())
  const [disabledLetters, setDisabledLetters] = useState([])
  const [correctWord, setCorrectWord] = useState('')

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet)
      setCorrectWord(words.todaysWord)
    })
  },[])

  const onSelectLetter = (keyVal) => {
    if (currentAttempt.letterPos > 4) return;
    const newBoard = [...board]
    newBoard[currentAttempt.attempt][currentAttempt.letterPos] = keyVal
    setBoard(newBoard)
    setCurrentAttempt({ ...currentAttempt, letterPos: currentAttempt.letterPos + 1 })
  }

  const onDelete = () => {
    if (currentAttempt.letterPos === 0) return;
    const newBoard = [...board];
    newBoard[currentAttempt.attempt][currentAttempt.letterPos - 1] = '';
    setBoard(newBoard);
    setCurrentAttempt({...currentAttempt, letterPos: currentAttempt.letterPos - 1})
  }

  const onEnter = () => {
    if(currentAttempt.letterPos !== 5) return;

    let currentWord = '';
    for (let i = 0; i < 5; i++ ) {
      currentWord += board[currentAttempt.attempt][i];
    }

    if (wordSet.has(currentWord.toLowerCase())) {
      setCurrentAttempt({ attempt: currentAttempt.attempt + 1, letterPos: 0 })
    }

    if (currentWord === correctWord) {
      alert('You guessed the word')
    }

    if (currentAttempt.attempt === 5) {
      console.log(correctWord)
    }

  }

  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
      <AppContext.Provider value={{ 
        board, 
        setBoard, 
        currentAttempt, 
        setCurrentAttempt, 
        onSelectLetter, 
        onDelete, 
        onEnter, 
        correctWord,
        setDisabledLetters,
        disabledLetters
        }}>
        <div className='game'>
          <Board />
          <Keyboard />
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
