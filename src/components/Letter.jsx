import React, { useContext, useEffect } from 'react'
import { AppContext } from '../App'

function Letter({ letterPos, attemptValue }) {
    const { board, correctWord, currentAttempt, setDisabledLetters } = useContext(AppContext)
    const letter = board[attemptValue][letterPos]

    const correct = correctWord.toUpperCase()[letterPos] === letter
    const almost = !correct && letter !== '' && correctWord.includes(letter)
    
    const letterState = currentAttempt.attempt > attemptValue && 
    (correct ? 'correct' : almost ? 'almost' : 'error')

    useEffect(() => {
      if (letter !== '' && !correct && !almost) {
        setDisabledLetters((prev) => [...prev, letter])
      }
    }, [currentAttempt.attempt])

  return (
    <div className='letter' id={letterState.toString()}> {letter} </div>
  )
}

export default Letter