import { Coordinates } from "../../types/game";
import Piece, { AbstractPieceOptions } from "./piece";
import lightIcon from "./rook-light.svg";
import darkIcon from "./rook.svg";

export default class Rook extends Piece {

	public constructor(options: AbstractPieceOptions) {
		super({ ...options, icon: options.player.color === "dark" ? darkIcon : lightIcon, symbol: "R" })
	}
	
	public get moves(): Coordinates[] {
		const expanded: Coordinates[] = []
		const [rank, file] = this.coordinates

		for (let i = 1; i < this.board.size - rank; i++) {
			if (!this.expandField([rank + i, file], expanded)) break
		}

		for (let i = 1; i < this.board.size - file; i++) {
			if (!this.expandField([rank, file + i], expanded)) break
		}

		for (let i = 1; i <= rank; i++) {
			if (!this.expandField([rank - i, file], expanded)) break
		}

		for (let i = 1; i <= file; i++) {
			if (!this.expandField([rank, file - i], expanded)) break
		}

		return expanded
	}
	
}