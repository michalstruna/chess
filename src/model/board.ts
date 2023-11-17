import { hasCoordinates } from "@/utils/game";
import History from "@/utils/history";
import { Coordinates, Field } from "../types/game";
import King from "./pieces/king";
import Piece from "./pieces/piece";
import Player from "./player";

export type BoardOptions = {
	players: Player[]
	size: number
	matrix?: Matrix
	onUpdate?: () => void
}

export type BoardMove = {
	number: number
	from: Coordinates
	to: Coordinates
	piece: Piece
	captured?: Piece
	firstMove?: boolean
	startTime: number
	endTime: number
}

type Matrix = Field[][]

export default class Board {

	public readonly players: Player[]
	public readonly matrix: Matrix
	public readonly size: number
	private readonly _history: History<BoardMove>
	private readonly onUpdate?: () => void
	public readonly startTime: number

	public constructor({ matrix, players, size, onUpdate }: BoardOptions) {
		this.players = players
		this.size = size
		this.matrix = matrix ?? this.generateMatrix()
		this._history = new History() // Default history,
		this.onUpdate = onUpdate
		this.startTime = Date.now()
	}

	public hasCoordinates(coordinates: Coordinates): boolean {
		for (const coordinate of coordinates) {
			if (coordinate < 0 || coordinate >= this.size) return false
		}

		return true
	}

	public evaluate(): number {
		let value = 0

		this.matrix.forEach(file => {
			file.forEach(rank => {
				if (rank) {
					value += rank.value * rank.player.direction
				}
			})
		})

		return value
	}

	public isLegalMove(from: Coordinates, to: Coordinates): boolean {
		let isValid = true

		const [oldFile, oldRank] = from
		const [newFile, newRank] = to
		const fromPiece = this.matrix[oldFile][oldRank]
		const toPiece = this.matrix[newFile][newRank]

		this.matrix[newFile][newRank] = fromPiece
		this.matrix[oldFile][oldRank] = null

		const king = this.matrix.flat().find(field => field instanceof King && field.player === fromPiece?.player) as King
		const kingCoordinates = king === fromPiece ? to : king.coordinates

		for (const field of this.matrix.flat()) {
			if (!field || field.player === king.player) continue

			if (hasCoordinates(field.getMoves(true), kingCoordinates!)) {
				isValid = false
				break
			}
		}	

		this.matrix[newFile][newRank] = toPiece
		this.matrix[oldFile][oldRank] = fromPiece

		return isValid
	}

	public clone(): Board {
		const matrix = this.matrix.map(field => field.slice())
		return new Board({ players: this.players, matrix, size: this.size });
	}

	public move(piece: Piece, to: Coordinates, pushHistory: boolean = true) {
		const [toFile, toRank] = to

		if (piece.coordinates) {
			const captured = this.matrix[toFile][toRank] || undefined

			if (pushHistory) {
				this._history.push({
					captured,
					endTime: Date.now(),
					firstMove: !piece.isDirty,
					from: piece.coordinates,
					number: this.history.length,
					piece,
					startTime: this.history[this.history.length - 1]?.endTime ?? this.startTime,
					to
				})
			}

			if (captured) captured.coordinates = undefined
			const [fromFile, fromRank] = piece.coordinates
			this.matrix[fromFile][fromRank] = null
		}

		this.matrix[toFile][toRank] = piece
		piece.coordinates = to
		piece.isDirty = true

		this.onUpdate?.()
	}

	public get history() {
		return this._history.toArray()
	}

	public undoMove() {
		const { from, piece, to, captured, firstMove } = this._history.undo().changed
		this.move(piece, from, false)
		if (captured) this.move(captured, to, false)
		if (firstMove) piece.isDirty = false
	}

	public redoMove() {
		const { from, piece, to } = this._history.redo().changed
		this.move(piece, to, false)
	}

	public canUndoMove(): boolean {
		return this._history.canUndo()
	}

	public canRedoMove(): boolean {
		return this._history.canRedo()
	}

	public goTo(moveNumber: number): void {
		const move = this.history[moveNumber]
		if (!move) throw new Error("Invalid move number.")

		for (let i = this.history.length - 1; i > moveNumber; i--) {
			this.undoMove()
		}
	}

	public get currentPlayer(): Player {
		return this.players[this.history.length % 2]
	}

	private generateMatrix(): Matrix {
		const rows: Matrix = []

		for (let i = 0; i < this.size; i++) {
			const columns: Matrix[number] = []

			for (let j = 0; j < this.size; j++) {
				columns.push(null)
			}

			rows.push(columns)
		}

		return rows
	}

}