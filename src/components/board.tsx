"use client"

import Field from "@/components/field"
import { BoardContext, BoardContextData } from "@/hooks/use-board-context"
import useKeyboard, { UseKeyboardOptions } from "@/hooks/use-keyboard"
import BoardModel from "@/model/board"
import Piece from "@/model/pieces/piece"
import { Ai as AiModel } from "@/types/ai"
import { Coordinates } from "@/types/game"
import { useEffect, useMemo, useState } from "react"
import BoardHistory from "./board-history"
import styles from "./board.module.scss"
import Evaluation from "./evaluation"

export type BoardProps = {
	model: BoardModel
	ai?: AiModel
}

const Board = (props: BoardProps) => {
	const { ai, model } = props

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

	const keyboard: UseKeyboardOptions = useMemo(() => [
		{ key: "ArrowLeft", handler: () => model.undoMove() },
		{ key: "ArrowRight", handler: () => model.redoMove() },
	], [model])

	useKeyboard(keyboard)

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
				{ai && <Evaluation value={ai.evaluate()} direction={perspectivePlayer.direction} />}
			</div>
			<BoardHistory moves={model.history} />
		</BoardContext.Provider>
	)
}

export default Board