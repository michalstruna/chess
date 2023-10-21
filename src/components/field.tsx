import useBoardContext from "@/hooks/useBoardContext"
import { StylableProps } from "@/types/props"
import { mergeProps } from "@/utils/props"
import c from "classnames"
import { MouseEvent, useCallback } from "react"
import styles from "./field.module.scss"

export type FieldProps = StylableProps & {
	column: number
	row: number
}

const Field = (props: FieldProps) => {
	const { column, row } = props
	const { highlights, setHighlights } = useBoardContext()
	const id = `${column} ${row}`
	const isHighlighted = highlights.includes(id)

	const backgroundColor = (column + row) % 2 === 1 ? "#888" : "khaki"

	const handleContextMenu = useCallback((e: MouseEvent<HTMLDivElement>) => {
		e.preventDefault()
		setHighlights(prev => prev.includes(id) ? prev.filter(it => it !== id) : [...prev, id]);
	}, [id, setHighlights])

	const handleClick = useCallback(() => {
		setHighlights([])
	}, [setHighlights])

	return (
		<div
			{...mergeProps(props, { className: c(styles.root, { [styles["root--highlighted"]]: isHighlighted }), style: { backgroundColor } })}
			onContextMenu={handleContextMenu}
			onClick={handleClick}
		>

		</div>
	)
}

export default Field