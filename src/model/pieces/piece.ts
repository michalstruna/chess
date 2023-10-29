import { isSameCoordinates } from "@/utils/game";
import { Coordinates } from "../../types/game";
import Board from "../board";
import Player from "../player";

export type AbstractPieceOptions = {
	coordinates: Coordinates
	player: Player
	board: Board
}

export type PieceOptions = AbstractPieceOptions & {
	symbol: string
	icon: any
}

export default abstract class Piece {

	public readonly board: Board
	private _coordinates: Coordinates
	public readonly player: Player
	public readonly symbol: string
	public readonly icon: any

	public constructor({ board, coordinates, icon, player, symbol }: PieceOptions) {
		this.board = board
		this._coordinates = coordinates
		this.player = player
		this.symbol = symbol
		this.icon = icon
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

	protected expandField (coordinates: Coordinates, expanded: Coordinates[]): boolean {
		const [i, j] = coordinates
		const piece = this.board.matrix[i][j]

		if (piece) {
			if (piece.player !== this.player) expanded.push(coordinates)
			return false
		}

		expanded.push(coordinates)
		return true
	}

	public canMove(coordinates: Coordinates): boolean {
		return this.moves.some(move => isSameCoordinates(move, coordinates))
	}

	public abstract get moves(): Coordinates[]

}