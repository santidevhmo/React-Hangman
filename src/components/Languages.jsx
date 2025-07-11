import { languages } from "../data/languages";

export default function Languages({ wrongGuessCount }) {
    return (
        <div className="flex flex-wrap justify-center gap-1">
            {languages.map((language, index) => {

                // "If the wrong count is 2, and the index is 0 or 1, the first 2 languages will have an overlay"
                if (index < wrongGuessCount) {
                    return (
                        <div key={language.name} className="relative">
                            <div
                                className="relative px-2 py-0.5 rounded-[4px] z-0"
                                style={{
                                    backgroundColor: language.backgroundColor,
                                    color: language.color,
                                }}
                            >
                                {language.name}
                                <div className="absolute flex justify-center items-center text-[14px] z-10 top-0 left-0 w-full h-full rounded-[4px] bg-black/60 opacity-100">
                                    💀
                                </div>
                            </div>
                        </div>
                    );

                // "If the index is higher than the wrongCount, render the language without an overlay"
                } else {
                    return (
                        <div key={language.name}
                            className="px-2 py-0.5 rounded-[4px]"
                            style={{
                                backgroundColor: language.backgroundColor,
                                color: language.color,
                            }}
                        >
                            {language.name}
                        </div>
                    );
                }
            })}
        </div>
    )
}