import BoardModel from "@/model/board";
import PieceModel from "@/model/pieces/piece";
import Player from "@/model/player";
import { Coordinates } from "@/types/game";
import { Setter } from "@/types/general";
import { createContext, useContext } from "react";

export type BoardContextData = {
	highlights: Coordinates[]
	setHighlights: Setter<Coordinates[]>
	selection: PieceModel | null
	setSelection: Setter<PieceModel | null>
	perspectivePlayer: Player
	setPerspectivePlayer: Setter<Player>
	selectionMoves: Coordinates[]
	model: BoardModel
}

export const BoardContext = createContext<BoardContextData>({} as unknown as BoardContextData)

const useBoardContext = (): BoardContextData => {
	const data = useContext(BoardContext);
	if (!data) throw new Error("useBoardContext should be inside BoardContext.Provider.");
	return data
}

export default useBoardContext