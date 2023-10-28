import { isSameCoordinates } from "@/utils/game";
import { Coordinates } from "../../types/game";
import Board from "../board";
import Player from "../player";

export type PieceOptions = {
	coordinates: Coordinates
	player: Player
	board: Board
	symbol: string
}

export default abstract class Piece {

	public readonly board: Board
	private _coordinates: Coordinates
	public readonly player: Player
	public readonly symbol: string

	public constructor({ board, coordinates, player, symbol }: PieceOptions) {
		this.board = board
		this._coordinates = coordinates
		this.player = player
		this.symbol = symbol

		this.move(coordinates)
	}

	public get coordinates(): Coordinates {
		return this._coordinates
	}

	public remove(): void {
		const [i, j] = this.coordinates
		this.board.matrix[i][j] = null
	}

	public move(coordinates: Coordinates): void {
		const [i, j] = coordinates

		this.board.matrix[i][j]?.remove()
		this.remove()
		this._coordinates = coordinates
		this.board.matrix[i][j] = this
	}

	public canMove(coordinates: Coordinates): boolean {
		return this.moves.some(move => isSameCoordinates(move, coordinates))
	}

	public abstract get moves(): Coordinates[]

}