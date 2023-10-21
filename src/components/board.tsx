"use client"

import Field from "@/components/field"
import { BoardContext } from "@/hooks/useBoardContext"
import { FieldCoordinate } from "@/types/board"
import { useState } from "react"
import styles from "./board.module.scss"

export type BoardProps = {

}

const SIZE = 8

const Board = (props: BoardProps) => {
	const { } = props

	const [highlights, setHighlights] = useState<FieldCoordinate[]>([]);

	const boardContext = {
		highlights,
		setHighlights
	}

	return (
		<BoardContext.Provider value={boardContext}>
			<div className={styles.root}>
				{Array.from({ length: SIZE }).map((_, i) => (
					Array.from({ length: SIZE }).map((_, j) => {
						const index = i * SIZE + j

						return (
							<Field
								key={index}
								style={{
									gridColumn: i + 1,
									gridRow: j + 1
								}}
								column={i}
								row={j}
							/>
						)
					})
				))}
			</div>
		</BoardContext.Provider>
	)
}

export default Board