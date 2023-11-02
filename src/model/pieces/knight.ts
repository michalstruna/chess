import { Coordinates } from "../../types/game";
import lightIcon from "./knight-light.svg";
import darkIcon from "./knight.svg";
import Piece, { PieceOptions } from "./piece";

const CHANGES = [-2, -1, 1, 2]

export default class Knight extends Piece {

	public constructor(options: PieceOptions) {
		super({ ...options, icon: options.player.color === "dark" ? darkIcon : lightIcon, symbol: "N", value: 3 })
	}
	
	public get moves(): Coordinates[] {
		const expanded: Coordinates[] = []
		const [file, rank] = this.coordinates

		for (let i of CHANGES) {
			for (let j of CHANGES) {
				if (Math.abs(i) === Math.abs(j)) continue
				this.expandField([file + i, rank + j], expanded)
			}
		}

		return expanded
	}
	
}