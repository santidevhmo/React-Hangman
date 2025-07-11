export default function WordDisplayed({ word, guessedLettersArr, gameOver }) {

    const wordArray = word.split('')

    return (
        <div className="flex justify-center gap-1">
            {/* For every letter in the current word of the game, check if it has been guessed already or not */}
            {wordArray.map((letter, index) => {
                // If the letter has been guessed, display the letter box with that letter
                if (guessedLettersArr.includes(letter)) {
                    return <div key={index} className="flex w-14 h-14 bg-[#323232] text-2xl text-center justify-center items-center font-bold border-b-2">
                        {letter.toUpperCase()}
                    </div>
                // If the game is over, display the letter box with that letter in red color
                } else if (gameOver) {
                    return <div key={index} className="flex w-14 h-14 bg-[#323232] text-2xl text-center text-[#EC5D49] justify-center items-center font-bold border-b-2 border-white">
                        {letter.toUpperCase()}
                    </div>
                // If the letter hasn't been guessed, display an empty letter box
                } else {
                    return <div key={index} className="flex justify-center items-center w-14 h-14 bg-[#323232] text-2xl font-bold border-b-2">

                    </div>
                }
            })}
        </div>
    )
}