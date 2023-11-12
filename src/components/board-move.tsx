import { BoardMove as BoardMoveModel } from "@/model/board"
import styles from "./board-move.module.scss"

export type BoardMoveProps = BoardMoveModel

const FILE_SYMBOLS = ["a", "b", "c", "d", "e", "f", "g", "h"]

const BoardMove = (props: BoardMoveProps) => {
	const { piece, to, captured } = props

	return (
		<div className={styles.root}>
			{`${piece.symbol}${captured ? "x" : ""}${FILE_SYMBOLS[to[0]]}${to[1]}`}
		</div>
	)
}

export default BoardMove