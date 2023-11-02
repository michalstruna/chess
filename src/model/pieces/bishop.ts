import { Coordinates } from "../../types/game";
import lightIcon from "./bishop-light.svg";
import darkIcon from "./bishop.svg";
import Piece, { PieceOptions } from "./piece";

export default class Bishop extends Piece {

	public constructor(options: PieceOptions) {
		super({ ...options, icon: options.player.color === "dark" ? darkIcon : lightIcon, symbol: "B", value: 3 })
	}
	
	public get moves(): Coordinates[] {
		const [file, rank] = this.coordinates
		const expanded: Coordinates[] = []

		for (let i = 1; i < this.board.size - Math.max(file, rank); i++) {
			if (!this.expandField([file + i, rank + i], expanded)) break
		}

		for (let i = 1; i < this.board.size - Math.max(this.board.size - rank - 1, file); i++) {
			if (!this.expandField([file + i, rank - i], expanded)) break
		}

		for (let i = 1; i < this.board.size - Math.max(this.board.size - file - 1, rank); i++) {
			if (!this.expandField([file - i, rank + i], expanded)) break
		}

		for (let i = 1; i < this.board.size - Math.max(this.board.size - rank - 1, this.board.size - file - 1); i++) {
			if (!this.expandField([file - i, rank - i], expanded)) break
		}

		return expanded
	}
	
}