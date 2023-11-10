import Piece from "@/model/pieces/piece"

export type Color = "dark" | "light"

export type Coordinates = [number, number]

export type Move = {
	from: Coordinates
	to: Coordinates
}

export type EvaluatedMove = Move & {
	evaluation: number
}

export type Direction = 1 | -1

export type Field = Piece | null