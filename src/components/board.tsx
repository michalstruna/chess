"use client"

import Field from "@/components/field"
import { BoardContext, BoardContextData } from "@/hooks/useBoardContext"
import BoardModel from "@/model/board"
import Piece from "@/model/pieces/piece"
import { Coordinates } from "@/types/game"
import { useEffect, useState } from "react"
import styles from "./board.module.scss"
import Evaluation from "./evaluation"

export type BoardProps = {
	model: BoardModel
	withEval?: boolean
}

const Board = (props: BoardProps) => {
	const { model, withEval } = props

	const [highlights, setHighlights] = useState<Coordinates[]>([])
	const [selection, setSelection] = useState<Piece | null>(null)
	const [currentPlayer, setCurrentPlayer] = useState(model.players[0])
	const [perspectivePlayer, setPerspectivePlayer] = useState(model.players[0])
	const [selectionMoves, setSelectionMoves] = useState<Coordinates[]>([]) // TODO: Cache inside each piece?

	const switchCurrentPlayer = () => setCurrentPlayer(prev => prev === model.players[0] ? model.players[1] : model.players[0])

	const boardContext: BoardContextData = {
		highlights,
		setHighlights,
		selection,
		setSelection,
		currentPlayer,
		switchCurrentPlayer,
		perspectivePlayer,
		setPerspectivePlayer,
		selectionMoves
	}

	useEffect(() => {
		setSelectionMoves(selection?.getMoves() ?? [])
	}, [selection])

	return (
		<BoardContext.Provider value={boardContext}>
			<div className={styles.root}>
				<div className={styles.matrix} style={{
					gridTemplateColumns: `repeat(${model.size}, 1fr)`,
					gridTemplateRows: `repeat(${model.size}, 1fr)`
				}}>
					{model.matrix.map((_, file) => (
						model.matrix[file].map((_, rank) => {
							const index = file * model.size + rank

							return (
								<Field
									key={index}
									style={{
										gridColumn: perspectivePlayer.direction === 1 ? (model.size - file) : file + 1,
										gridRow: perspectivePlayer.direction === 1 ? (model.size - rank) : rank + 1,
									}}
									coordinates={[file, rank]}
									piece={model.matrix[file][rank]}
								/>
							)
						})
					))}
				</div>
				{withEval && <Evaluation value={model.evaluate()} direction={perspectivePlayer.direction} />}
			</div>
		</BoardContext.Provider>
	)
}

export default Board