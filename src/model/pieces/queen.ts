import { Coordinates } from "../../types/game";
import Piece, { PieceOptions } from "./piece";
import lightIcon from "./queen-light.svg";
import darkIcon from "./queen.svg";

export default class Queen extends Piece {

	public constructor(options: PieceOptions) {
		super({ ...options, icon: options.player.color === "dark" ? darkIcon : lightIcon, symbol: "Q", value: 9 })
	}
	
	public getMoves(allowIllegal?: boolean): Coordinates[] {
		const expanded: Coordinates[] = []
		const [file, rank] = this.coordinates

		for (let i = 1; i < this.board.size - rank; i++) {
			if (!this.expandField([file, rank + i], expanded, allowIllegal)) break
		}

		for (let i = 1; i < this.board.size - file; i++) {
			if (!this.expandField([file + i, rank], expanded, allowIllegal)) break
		}

		for (let i = 1; i <= rank; i++) {
			if (!this.expandField([file, rank - i], expanded, allowIllegal)) break
		}

		for (let i = 1; i <= file; i++) {
			if (!this.expandField([file - i, rank], expanded, allowIllegal)) break
		}

		for (let i = 1; i < this.board.size - Math.max(file, rank); i++) {
			if (!this.expandField([file + i, rank + i], expanded, allowIllegal)) break
		}

		for (let i = 1; i < this.board.size - Math.max(this.board.size - rank - 1, file); i++) {
			if (!this.expandField([file + i, rank - i], expanded, allowIllegal)) break
		}

		for (let i = 1; i < this.board.size - Math.max(this.board.size - file - 1, rank); i++) {
			if (!this.expandField([file - i, rank + i], expanded, allowIllegal)) break
		}

		for (let i = 1; i < this.board.size - Math.max(this.board.size - rank - 1, this.board.size - file - 1); i++) {
			if (!this.expandField([file - i, rank - i], expanded, allowIllegal)) break
		}

		return expanded
	}
	
}