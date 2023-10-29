import { Coordinates } from "../../types/game";
import lightIcon from "./king-light.svg";
import darkIcon from "./king.svg";
import Piece, { AbstractPieceOptions } from "./piece";

export default class King extends Piece {

	public constructor(options: AbstractPieceOptions) {
		super({ ...options, icon: options.player.color === "dark" ? darkIcon : lightIcon, symbol: "K" })
	}
	
	public get moves(): Coordinates[] {
		const [i, j] = this.coordinates
		const expanded: Coordinates[] = []

		for (let offsetI = -1; offsetI <= 1; offsetI++) {
			for (let offsetJ = -1; offsetJ <= 1; offsetJ++) {
				this.expandField([i + offsetI, j + offsetJ], expanded)
			}
		}

		// TODO: Filter out check moves.

		return expanded
	}
	
}