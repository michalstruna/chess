import { Color } from "../types/game";
import User from "./user";

export type PlayerOptions = {
	user: User
	color: Color
}

export default class Player {

	public readonly color: Color
	public readonly user: User

	public constructor({ color, user }: PlayerOptions) {
		this.color = color
		this.user = user
	}

}