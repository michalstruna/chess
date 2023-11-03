import useBoardContext from "@/hooks/useBoardContext"
import Piece from "@/model/pieces/piece"
import { Coordinates } from "@/types/game"
import { StylableProps } from "@/types/props"
import { isSameCoordinates } from "@/utils/game"
import { mergeProps } from "@/utils/props"
import c from "classnames"
import Image from "next/image"
import { MouseEvent, useCallback } from "react"
import styles from "./field.module.scss"

export type FieldProps = StylableProps & {
	coordinates: Coordinates
	piece?: Piece | null
}

const Field = (props: FieldProps) => {
	const { coordinates, piece } = props
	const { highlights, setHighlights, selection, setSelection, currentPlayer, switchCurrentPlayer } = useBoardContext()
	const id = `${coordinates[0]} ${coordinates[1]}`
	const isHighlighted = highlights.includes(id)

	const backgroundColor = (coordinates[0] + coordinates[1]) % 2 === 1 ? "#888" : "khaki"

	const handleContextMenu = useCallback((e: MouseEvent<HTMLDivElement>) => {
		e.preventDefault()
		setSelection(null)
		setHighlights(prev => prev.includes(id) ? prev.filter(it => it !== id) : [...prev, id]);
	}, [id, setHighlights, setSelection])

	const handleClick = useCallback(() => {
		if (selection?.canMove(coordinates)) {
			selection.move(coordinates)
			switchCurrentPlayer()
			setSelection(null)

		} else {
			if (piece) {
				if (piece.player === currentPlayer) {
					setSelection(piece)
				} else {
					setSelection(null)
				}
			} else {
				setSelection(null)
			}
		}

		setHighlights([])
	}, [coordinates, currentPlayer, piece, selection, setHighlights, setSelection, switchCurrentPlayer])

	const isMove = selection && selection.moves.some(move => isSameCoordinates(move, coordinates))
	const isCapture = isMove && piece

	return (
		<div
			{...mergeProps(
				props,
				{
					className: c(styles.root, {
						[styles["root--highlighted"]]: isHighlighted,
						[styles["root--selected"]]: selection && selection === piece,
						[styles["root--move"]]: isMove && !isCapture,
						[styles["root--capture"]]: isCapture,
					}), style: { backgroundColor }
				})}
			onContextMenu={handleContextMenu}
			onClick={handleClick}
		>
			{piece && (
				<div className={styles.inner}>
					<Image src={piece.icon} alt={piece.symbol} className={styles.icon} />
				</div>
			)}
		</div>
	)
}

export default Field