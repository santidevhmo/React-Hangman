import { clsx } from "clsx";

export default function Keyboard({ gameWord, guessedLettersArr, addGuessedLetter, isGameOver }) {

    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    const currentWordArray = gameWord.split('') // Game Word split into an array for key styling conditional

    return (
        <div className="flex flex-wrap gap-3 justify-center">

            {/* Rendering every keyboard btn by turning alphabet string to an Array and then Mapping through it */}
            {alphabet.split('').map((letter, index) => {
                
                const isCorrect = guessedLettersArr.includes(letter) && currentWordArray.includes(letter)
                const isWrong = guessedLettersArr.includes(letter) && !currentWordArray.includes(letter)

                // Conditional Tailwind Styling depending on the 3 available states for the btn
                const letterStyling = clsx(
                    "py-3 px-5 border-1 rounded-md border-white text-[#1E1E1E] text-xl", // Default tailwind styling for every letter in any state
                    {
                        "bg-[#10A95B] opacity-50 cursor-not-allowed pointer-events-none" : isCorrect && isGameOver, // Correct answer and the game is over
                        "bg-[#EC5D49] opacity-50 cursor-not-allowed pointer-events-none" : isWrong && isGameOver, // Wrong answer and the game is over
                        "bg-[#10A95B] cursor-not-allowed pointer-events-none" : isCorrect, // Correct Answer and the game is still live
                        "bg-[#EC5D49] cursor-default" : isWrong, // Wrong Answer and the game is still live
                        "bg-[#FCBA29] opacity-50 cursor-not-allowed pointer-events-none" : !isCorrect && !isWrong && isGameOver, // Waiting for click Answer and the game is still live
                        "bg-[#FCBA29] cursor-pointer" : !isCorrect && !isWrong,  // Waiting for click and the game is still over
                    }
                )

                return <button
                    disabled={guessedLettersArr.includes(letter)} // Disable button if it's letter is already in the guessedLetters state var array
                    className={letterStyling}
                    key={index}
                    aria-label={`Letter ${letter}`}
                    onClick={(() => addGuessedLetter(letter))}
                >
                    {letter.toUpperCase()}
                </button>
            })}
        </div>
    )
}