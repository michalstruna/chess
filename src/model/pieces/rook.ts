import { Coordinates } from "../../types/game";
import Piece, { PieceOptions } from "./piece";

export default class Rook extends Piece {

	public constructor(options: Omit<PieceOptions, "symbol">) {
		super({ ...options, symbol: "R" })
	}
	
	public get moves(): Coordinates[] {
		const result: Coordinates[] = []

		for (let i = this.coordinates[0] + 1; i < this.board.size; i++) {
			if (this.board.matrix[i][this.coordinates[1]]) break
			result.push([i, this.coordinates[1]])
		}

		for (let i = this.coordinates[0] - 1; i >= 0; i--) {
			if (this.board.matrix[i][this.coordinates[1]]) break
			result.push([i, this.coordinates[1]])
		}

		for (let i = this.coordinates[1] + 1; i < this.board.size; i++) {
			if (this.board.matrix[this.coordinates[0]][i]) break
			result.push([this.coordinates[0], i])
		}

		for (let i = this.coordinates[1] - 1; i >= 0; i--) {
			if (this.board.matrix[this.coordinates[0]][i]) break
			result.push([this.coordinates[0], i])
		}

		return result
	}
	
}