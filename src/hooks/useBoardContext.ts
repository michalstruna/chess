import PieceModel from "@/model/pieces/piece";
import Player from "@/model/player";
import { Setter } from "@/types/general";
import { createContext, useContext } from "react";

export type BoardContextData = {
	highlights: string[]
	setHighlights: Setter<string[]>
	selection: PieceModel | null
	setSelection: Setter<PieceModel | null>
	perspectivePlayer: Player
	switchCurrentPlayer: () => void
	currentPlayer: Player
	setCurrentPlayer: Setter<Player>
}

export const BoardContext = createContext<BoardContextData>({} as unknown as BoardContextData)

const useBoardContext = (): BoardContextData => {
	const data = useContext(BoardContext);
	if (!data) throw new Error("useBoardContext should be inside BoardContext.Provider.");
	return data
}

export default useBoardContext