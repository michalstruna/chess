import { Coordinates } from "../../types/game";
import Piece, { PieceOptions } from "./piece";
import lightIcon from "./rook-light.svg";
import darkIcon from "./rook.svg";

export default class Rook extends Piece {

	public constructor(options: PieceOptions) {
		super({ ...options, icon: options.player.color === "dark" ? darkIcon : lightIcon, symbol: "R", value: 5 })
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

		return expanded
	}
	
}