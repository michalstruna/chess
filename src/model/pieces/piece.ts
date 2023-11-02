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
	isDirty?: boolean
}

export default abstract class Piece {

	public readonly board: Board
	private _coordinates: Coordinates
	public readonly player: Player
	public readonly symbol: string
	public readonly icon: any
	private _isDirty: boolean

	public constructor({ board, coordinates, icon, player, symbol, isDirty = false }: PieceOptions) {
		this.board = board
		this._coordinates = coordinates
		this.player = player
		this.symbol = symbol
		this.icon = icon
		this.move(coordinates)
		this._isDirty = isDirty
	}

	public get coordinates(): Coordinates {
		return this._coordinates
	}

	public get isDirty(): boolean {
		return this._isDirty
	}

	public remove(): void {
		const [file, rank] = this.coordinates
		this.board.matrix[file][rank] = null
	}

	public move(coordinates: Coordinates): void {
		const [file, rank] = coordinates
		this.board.matrix[file][rank]?.remove()
		this.remove()
		this._coordinates = coordinates
		this.board.matrix[file][rank] = this
		this._isDirty = true
	}

	protected expandField (coordinates: Coordinates, expanded: Coordinates[], interaction: "any" | "attack" | "move" = "any"): boolean {
		if (!this.board.hasCoordinates(coordinates)) return false
		const [file, rank] = coordinates
		const piece = this.board.matrix[file][rank]

		if (piece) {
			if (piece.player !== this.player) {
				if (interaction === "move") return false
				expanded.push(coordinates)
			}

			return false
		}

		if (interaction !== "attack") expanded.push(coordinates)

		return true
	}

	public canMove(coordinates: Coordinates): boolean {
		return this.moves.some(move => isSameCoordinates(move, coordinates))
	}

	public abstract get moves(): Coordinates[]

}