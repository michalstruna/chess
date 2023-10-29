import { Coordinates } from "../../types/game";
import lightIcon from "./bishop-light.svg";
import darkIcon from "./bishop.svg";
import Piece, { AbstractPieceOptions } from "./piece";

export default class Bishop extends Piece {

	public constructor(options: AbstractPieceOptions) {
		super({ ...options, icon: options.player.color === "dark" ? darkIcon : lightIcon, symbol: "B" })
	}
	
	public get moves(): Coordinates[] {
		const [rank, file] = this.coordinates
		const expanded: Coordinates[] = []

		for (let i = 1; i < this.board.size - Math.max(rank, file); i++) {
			if (!this.expandField([rank + i, file + i], expanded)) break
		}

		for (let i = 1; i < this.board.size - Math.max(this.board.size - rank - 1, file); i++) {
			if (!this.expandField([rank - i, file + i], expanded)) break
		}

		for (let i = 1; i < this.board.size - Math.max(rank, this.board.size - file - 1); i++) {
			if (!this.expandField([rank + i, file - i], expanded)) break
		}

		for (let i = 1; i < this.board.size - Math.max(this.board.size - rank - 1, this.board.size - file - 1); i++) {
			if (!this.expandField([rank - i, file - i], expanded)) break
		}

		return expanded
	}
	
}