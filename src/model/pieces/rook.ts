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

		for (let i = this.coordinates[0] + 1; i < this.board.size; i++) {
			if (!this.expandField([i, this.coordinates[1]], expanded)) break
		}

		for (let i = this.coordinates[0] - 1; i >= 0; i--) {
			if (!this.expandField([i, this.coordinates[1]], expanded)) break
		}

		for (let i = this.coordinates[1] + 1; i < this.board.size; i++) {
			if (!this.expandField([this.coordinates[0], i], expanded)) break
		}

		for (let i = this.coordinates[1] - 1; i >= 0; i--) {
			if (!this.expandField([this.coordinates[0], i], expanded)) break
		}

		return expanded
	}
	
}