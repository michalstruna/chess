import { EvaluatedMove } from "./game"

export type Ai = {
	evaluate(): number
	getBestMove(): EvaluatedMove
	getNextMoves(): EvaluatedMove[]
}