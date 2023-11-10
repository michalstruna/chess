import { Ai } from "@/types/ai"
import { EvaluatedMove, Move } from "@/types/game"
import Board from "./board"

export type MinimaxOptions = {
	board: Board
	depth?: number
}

export type MinimaxState = {
	board: Board
	path: Board[]
}

export default class Minimax implements Ai {

	private board: Board
	private readonly depth: number

	public constructor({ board, depth = 2 }: MinimaxOptions) {
		this.board = board
		this.depth = depth
	}

	public evaluate(): number {
		return this.board.evaluate()
	}

	public getBestMove(): EvaluatedMove {
		return { evaluation: 0, from: [0, 0], to: [1, 1] }
	}

	public getNextMoves(): EvaluatedMove[] {
		return []
	}

	private getAllMoves(board: Board): Move[] {
		const moves: Move[] = []

		board.matrix.forEach(file => {
			file.forEach(rank => {
				if (rank && rank.player === board.players[0]) {
					moves.push(...rank.getMoves().map(to => ({ from: rank.coordinates, to })))
				}
			})	
		})

		return moves
	}

}