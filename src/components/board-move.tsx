import { BoardMove as BoardMoveModel } from "@/model/board"
import styles from "./board-move.module.scss"

export type BoardMoveProps = BoardMoveModel

const FILE_SYMBOLS = ["a", "b", "c", "d", "e", "f", "g", "h"]

const BoardMove = (props: BoardMoveProps) => {
	const { piece, to, captured, number, endTime, startTime } = props

	const handleClick = () => {
		piece.board.goTo(number)
	}

	const duration = Math.round((endTime - startTime) / 1000)

	return (
		<div className={styles.root} onClick={handleClick}>
			{`${number + 1}. ${piece.symbol}${captured ? "x" : ""}${FILE_SYMBOLS[to[0]]}${to[1]} (${duration} s)`}
		</div>
	)
}

export default BoardMove