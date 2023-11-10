import { hasCoordinates } from "@/utils/game";
import { Coordinates, Field, Move } from "../types/game";
import King from "./pieces/king";
import Player from "./player";

export type BoardOptions = {
	players: Player[]
	size: number
	matrix?: Matrix
}

type Matrix = Field[][]

export default class Board {

	public readonly players: Player[]
	public readonly matrix: Matrix
	public readonly size: number

	public constructor({ matrix, players, size }: BoardOptions) {
		this.players = players
		this.size = size
		this.matrix = matrix ?? this.generateMatrix()
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

			if (hasCoordinates(field.getMoves(true), kingCoordinates)) {
				isValid = false
				break
			}
		}	

		this.matrix[newFile][newRank] = toPiece
		this.matrix[oldFile][oldRank] = fromPiece

		return isValid
	}

	public move(move: Move) {
		const { from: [fromFile, fromRank], to } = move
		this.matrix[fromFile][fromRank]!.move(to)
	}

	public clone(): Board {
		const matrix = this.matrix.map(field => field.slice())
		return new Board({ players, matrix, size });
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