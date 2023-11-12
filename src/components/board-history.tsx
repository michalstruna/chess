import { BoardMove as BoardMoveModel } from "@/model/board"
import styles from "./board-history.module.scss"
import BoardMove from "./board-move"

export type BoardHistoryProps = {
	moves: BoardMoveModel[]
}

const BoardHistory = (props: BoardHistoryProps) => {
	const { moves } = props

	return (
		<div className={styles.root}>
			{moves.map((move, i) => <BoardMove key={i} {...move} />)}
		</div>
	)

}

export default BoardHistory