import { Coordinates } from "../../types/game";
import lightIcon from "./pawn-light.svg";
import darkIcon from "./pawn.svg";
import Piece, { PieceOptions } from "./piece";

export default class Pawn extends Piece {

	public constructor(options: PieceOptions) {
		super({ ...options, icon: options.player.color === "dark" ? darkIcon : lightIcon, symbol: "", value: 1 })
	}

	public getMoves(allowIllegal?: boolean): Coordinates[] {
		const expanded: Coordinates[] = []
		const [file, rank] = this.coordinates

		if (this.expandField([file, rank + this.player.direction], expanded, allowIllegal, "move")) {
			if (!this.isDirty) this.expandField([file, rank + 2 * this.player.direction], expanded, allowIllegal, "move")
		}

		this.expandField([file - 1, rank + this.player.direction], expanded, allowIllegal, "attack")
		this.expandField([file + 1, rank + this.player.direction], expanded, allowIllegal, "attack")

		return expanded
	}

}