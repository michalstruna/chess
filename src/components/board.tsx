"use client"

import Field from "@/components/field"
import { BoardContext } from "@/hooks/useBoardContext"
import BoardModel from "@/model/board"
import Piece from "@/model/pieces/piece"
import { Coordinates } from "@/types/game"
import { useState } from "react"
import styles from "./board.module.scss"

export type BoardProps = {
	model: BoardModel
}

const Board = (props: BoardProps) => {
	const { model } = props

	const [highlights, setHighlights] = useState<Coordinates[]>([])
	const [selection, setSelection] = useState<Piece | null>(null)

	const boardContext = {
		highlights,
		setHighlights,
		selection,
		setSelection
	}

	return (
		<BoardContext.Provider value={boardContext}>
			<div className={styles.root} style={{
				gridTemplateColumns: `repeat(${model.size}, 1fr)`,
				gridTemplateRows: `repeat(${model.size}, 1fr)`
			}}>
				{model.matrix.map((_, i) => (
					model.matrix[i].map((_, j) => {
						const index = i * model.size + j

						return (
							<Field
								key={index}
								style={{
									gridColumn: i + 1,
									gridRow: j + 1
								}}
								coordinates={[i, j]}
								piece={model.matrix[i][j]}
							/>
						)
					})
				))}
			</div>
		</BoardContext.Provider>
	)
}

export default Board