import { getFarewellText } from "../utils/utils"
import { languages } from "../data/languages"
import { useState, useEffect } from 'react'

export default function StatusSection({ wrongCount, isGameWon, isGameLost }) {

  let [farewellText, setFarewellText] = useState("")

  // ONLY when the wrong count increases, change the text value
  useEffect(() => {
    // If the user has already started getting wrong answers (if the wrong count is more than 0)
    if (wrongCount >= 1) {
      // Retrieve the language name in its -1 index (language name of index wrongCount = 1 is CSS. Language name should be HTML in this case, which is index wrongCount - 1)
      setFarewellText(getFarewellText(languages[wrongCount - 1].name))
    }
  }, [wrongCount])


  // If the game was won
  if (isGameWon) {
    return (
      <div className="bg-[#10A95B] rounded-sm text-[#F9F4DA] py-2 text-center">
        <h2 className="text-2xl">You win!</h2>
        <h2 className="text-md">Well done! 🎉</h2>
      </div>
    )
    // If the game was lost
  } else if (isGameLost) {
    return (
      <div className="bg-[#BA2A2A] rounded-sm text-[#F9F4DA] py-2 text-center">
        <h2 className="text-2xl">Game Over!</h2>
        <h2 className="text-md">You lose! Better start learning Assembly 😭</h2>
      </div>
    )
    // If the game has started
  } else if (wrongCount >= 1) {
    return (
      <div className="rounded-sm bg-[#7A5EA7] border-1 border-black border-dashed text-[#F9F4DA] py-9 text-center">
        {farewellText}
      </div>
    )
    // If the game hasn't started yet
  } else {
    return (
      <div className="rounded-sm text-[#F9F4DA] py-9 text-center"></div>
    )
  }

}