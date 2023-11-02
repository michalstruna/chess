import { Coordinates } from "../../types/game";
import Piece, { AbstractPieceOptions } from "./piece";
import lightIcon from "./queen-light.svg";
import darkIcon from "./queen.svg";

export default class Queen extends Piece {

	public constructor(options: AbstractPieceOptions) {
		super({ ...options, icon: options.player.color === "dark" ? darkIcon : lightIcon, symbol: "Q" })
	}
	
	public get moves(): Coordinates[] {
		const expanded: Coordinates[] = []
		const [file, rank] = this.coordinates

		for (let i = 1; i < this.board.size - rank; i++) {
			if (!this.expandField([file, rank + i], expanded)) break
		}

		for (let i = 1; i < this.board.size - file; i++) {
			if (!this.expandField([file + i, rank], expanded)) break
		}

		for (let i = 1; i <= rank; i++) {
			if (!this.expandField([file, rank - i], expanded)) break
		}

		for (let i = 1; i <= file; i++) {
			if (!this.expandField([file - i, rank], expanded)) break
		}

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