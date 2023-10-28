import PieceModel from "@/model/pieces/piece";
import { Setter } from "@/types/general";
import { createContext, useContext } from "react";

export type BoardContextData = {
	highlights: string[]
	setHighlights: Setter<string[]>
	selection: PieceModel | null
	setSelection: Setter<PieceModel | null>
}

export const BoardContext = createContext<BoardContextData | null>({
	highlights: [],
	setHighlights: () => { },
	selection: null,
	setSelection: () => { }
})

const useBoardContext = (): BoardContextData => {
	const data = useContext(BoardContext);
	if (!data) throw new Error("useBoardContext should be inside BoardContext.Provider.");
	return data
}

export default useBoardContext