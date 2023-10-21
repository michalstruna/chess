import { createContext, useContext } from "react";

export type BoardContextData = {
	highlights: string[]
	setHighlights: (value: string[] | ((prev: string[]) => string[])) => void
}

export const BoardContext = createContext<BoardContextData | null>({
	highlights: [],
	setHighlights: () => { }
})

const useBoardContext = (): BoardContextData => {
	const data = useContext(BoardContext);
	if (!data) throw new Error("useBoardContext should be inside BoardContext.Provider.");
	return data
}

export default useBoardContext