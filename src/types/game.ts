import Piece from "@/model/pieces/piece"

export type Color = "dark" | "light"

export type Coordinates = [number, number]

export type Direction = 1 | -1

export type Field = Piece | null