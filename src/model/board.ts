import { Coordinates } from "../types/game";
import Piece from "./pieces/piece";
import Player from "./player";

export type BoardOptions = {
	players: Player[]
	size: number
}

type Matrix = (Piece | null)[][]

export default class Board {
	
	public readonly players: Player[]
	public readonly matrix: Matrix
	public readonly size: number

	public constructor({ players, size }: BoardOptions) {
		this.players = players
		this.size = size
		this.matrix = this.generateMatrix()
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