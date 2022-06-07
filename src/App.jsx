import './App.css';

import { useState, createContext } from 'react'

import Board from './components/Board.jsx';
import Keyboard from './components/Keyboard.jsx';

import { boardDefault } from './Words';

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault)
  const [currentAttempt, setCurrentAttempt ] = useState({attempt: 0, letterPos: 0})
  return (
    <div className="App">
      <nav>
        <h1>Wordle</h1>
      </nav>
      <AppContext.Provider value={{ board, setBoard, currentAttempt, setCurrentAttempt }}>
        <div className='game'>
          <Board />
          <Keyboard />
        </div>
      </AppContext.Provider>
    </div>
  );
}

export default App;
