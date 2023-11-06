import { Coordinates } from "../../types/game";
import Board from "../board";
import Player from "../player";

export type PieceOptions = {
	coordinates: Coordinates
	player: Player
	board: Board
}

export type AbstractPieceOptions = PieceOptions & {
	symbol: string
	value: number
	icon: any
	isDirty?: boolean
}

export default abstract class Piece {

	public readonly board: Board
	private _coordinates: Coordinates
	public readonly player: Player
	public readonly symbol: string
	public readonly icon: any
	public readonly value: number
	private _isDirty: boolean

	public constructor({ board, coordinates, icon, player, symbol, isDirty = false, value }: AbstractPieceOptions) {
		this.board = board
		this._coordinates = coordinates
		this.player = player
		this.symbol = symbol
		this.icon = icon
		this.move(coordinates)
		this._isDirty = isDirty
		this.value = value
	}

	public get coordinates(): Coordinates {
		return this._coordinates
	}

	public get isDirty(): boolean {
		return this._isDirty
	}

	public move(coordinates: Coordinates): void {
		const [oldFile, oldRank] = this.coordinates
		const [file, rank] = coordinates
		this.board.matrix[oldFile][oldRank] = null
		this.board.matrix[file][rank] = this
		this._coordinates = coordinates
		this._isDirty = true
	}

	protected expandField (coordinates: Coordinates, expanded: Coordinates[], allowIllegal: boolean = false, interaction: "any" | "attack" | "move" = "any"): boolean {
		if (!this.board.hasCoordinates(coordinates)) return false
		const [file, rank] = coordinates
		const piece = this.board.matrix[file][rank]
		if (!piece && interaction === "attack") return false // Piece must attack other piece.
		if (piece && interaction === "move") return false // Piece cań't attack other piece.
		if (piece?.player === this.player) return false // User can't attack their own pieces.
		if (!allowIllegal && !this.board.isLegalMove(this.coordinates, coordinates)) return false // Illegal move (own check).

		expanded.push(coordinates)
		return !piece
	}

	public abstract getMoves(allowIllegal?: boolean): Coordinates[]

}