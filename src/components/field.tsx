import useBoardContext from "@/hooks/useBoardContext"
import Piece from "@/model/pieces/piece"
import { Coordinates } from "@/types/game"
import { StylableProps } from "@/types/props"
import { isSameCoordinates } from "@/utils/game"
import { mergeProps } from "@/utils/props"
import c from "classnames"
import { MouseEvent, useCallback } from "react"
import styles from "./field.module.scss"

export type FieldProps = StylableProps & {
	coordinates: Coordinates
	piece?: Piece | null
}

const Field = (props: FieldProps) => {
	const { coordinates, piece } = props
	const { highlights, setHighlights, selection, setSelection } = useBoardContext()
	const id = `${coordinates[0]} ${coordinates[1]}`
	const isHighlighted = highlights.includes(id)

	const backgroundColor = (coordinates[0] + coordinates[1]) % 2 === 1 ? "#888" : "khaki"

	const handleContextMenu = useCallback((e: MouseEvent<HTMLDivElement>) => {
		e.preventDefault()
		setSelection(null)
		setHighlights(prev => prev.includes(id) ? prev.filter(it => it !== id) : [...prev, id]);
	}, [id, setHighlights, setSelection])

	const handleClick = useCallback(() => {
		if (selection?.canMove(coordinates)) selection?.move(coordinates)
		setHighlights([])
		setSelection(piece || null)
	}, [coordinates, piece, selection, setHighlights, setSelection])

	return (
		<div
			{...mergeProps(
				props,
				{ className: c(styles.root, {
					[styles["root--highlighted"]]: isHighlighted,
					[styles["root--selected"]]: selection && selection === piece,
					[styles["root--move"]]: selection && selection.moves.some(move => isSameCoordinates(move, coordinates))
				}), style: { backgroundColor } })}
			onContextMenu={handleContextMenu}
			onClick={handleClick}
		>
			<div className={styles.inner}>
				{piece && (
					piece.symbol
				)}
			</div>
		</div>
	)
}

export default Field