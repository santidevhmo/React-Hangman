import './App.css'
import { useState, useEffect } from 'react'

// Data
import { languages } from './data/languages'

// Components
import StatusSection from './components/StatusSection'
import Languages from './components/Languages'
import WordDisplayed from './components/WordDisplayed.jsx'
import Keyboard from './components/Keyboard.jsx'
import Confetti from 'react-confetti'

// Utils
import { getRandomWord } from './utils/utils'

function App() {

  // Used for the Confetti react component
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  // State values
  const [currentWord, setCurrentWord] = useState(() => getRandomWord())
  const [guessedLetters, setGuessedLetters] = useState([])

  // Derived values
  const currentWordArray = currentWord.split('');
  let wrongGuessCount = guessedLetters.reduce((count, letter) => { // reduce = used to reduce entire array to a single value (in this case, a count INT)
    // Iterate over every current guessed word. If that word IS NOT inside the currentWord array, ++1 to the value of this var (the count of wrong guesses)
    if (!currentWordArray.includes(letter)) {
      return count + 1;
    }
    return count;
  }, 0);
  // Derived Values
  const isGameWon = 
    currentWordArray.every(letter => guessedLetters.includes(letter)) // .every = "Determines whether all the members of an array satisfy the specified test." 
  const isGameLost = 
    wrongGuessCount == languages.length // If the wrong count is the length of the languages array, the game is over (no more languages left to discard)
  const isGameOver = isGameWon || isGameLost

  useEffect(() => {
    // console.log(isGameOver)
  }, [isGameWon])

  // Handles user click of keyboard letter by appending to guessedLetters state
  function addGuessedLetter(letter) {
    setGuessedLetters(prevGuessedLetters => [...prevGuessedLetters, letter])

  }

  // Restart the game
  function newGameClick() {
    setCurrentWord(() => getRandomWord()) // New game word
    setGuessedLetters([]) // Empty guessedLetters arr
    wrongGuessCount = 0
  }

  return (
    <main className="flex flex-col mt-20 items-center">

      {/* Confetti display if the game is won */}
      {isGameWon 
        ? <Confetti width={windowWidth} height={windowHeight} />
        : null
      }

      <section className="max-w-[450px]">
        <header className='text-center'>
          <h1 className="text-2xl font-bold text-[#F9F4DA]">Assembly: Endgame</h1>
          <p className="font-sm text-[#8E8E8E]">Guess the word within 8 attempts to keep the programming world safe from Assembly!</p>
        </header>

        <div className="mt-4">
          <StatusSection
            wrongCount={wrongGuessCount}
            isGameWon={isGameWon}
            isGameLost={isGameLost}
          />
        </div>

        <div className="mt-8">
          <Languages
            wrongGuessCount={wrongGuessCount}
          />
        </div>

        <div className="mt-8">
          <WordDisplayed
            word={currentWord}
            guessedLettersArr={guessedLetters}
            gameOver={isGameOver}
          />
        </div>
      </section>

      <section className="max-w-[650px] mt-8">
        <Keyboard
          gameWord={currentWord}
          guessedLettersArr={guessedLetters}
          addGuessedLetter={addGuessedLetter}
          isGameOver={isGameOver}
        />
      </section>

      {isGameOver &&
        <button
          className="mt-8 bg-[#11B5E5] border-1 border-[#D7D7D7] text-black rounded-sm w-[225px] h-[40px] py-1.5 px-3 cursor-pointer"
          onClick={() => newGameClick()}
        >New game</button>
      }

    </main>
  )
}

export default App
