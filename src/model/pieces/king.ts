import { Coordinates } from "../../types/game";
import lightIcon from "./king-light.svg";
import darkIcon from "./king.svg";
import Piece, { PieceOptions } from "./piece";
import Rook from "./rook";

export default class King extends Piece {

	public constructor(options: PieceOptions) {
		super({ ...options, icon: options.player.color === "dark" ? darkIcon : lightIcon, symbol: "K", value: 1000 })
	}
	
	public get moves(): Coordinates[] {
		const [file, rank] = this.coordinates
		const expanded: Coordinates[] = []

		for (let offsetI = -1; offsetI <= 1; offsetI++) {
			for (let offsetJ = -1; offsetJ <= 1; offsetJ++) {
				this.expandField([file + offsetI, rank + offsetJ], expanded)
			}
		}

		// Castling.
		if (!this.isDirty) {
			for (const i of [-1, 1]) {
				for (let newFile = file + i; this.board.hasCoordinates([newFile, rank]); newFile += i) {
					const field = this.board.matrix[newFile][rank]
					if (!field) continue
					if (!(field instanceof Rook) || field.isDirty) break
					expanded.push([file + 2 * i, rank])
				}
 			}
		}

		// TODO: Filter out check castling.
		// TODO: Filter out check moves.

		return expanded
	}
	
}