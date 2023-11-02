import { Direction } from "@/types/game"
import styles from "./evaluation.module.scss"

export type EvaluationProps = {
	direction: Direction
	value: number
}

const Evaluation = (props: EvaluationProps) => {
	const { direction, value } = props
	const percentage = 100 / (1 + Math.pow(Math.E, value / 2.5))
	const leading = value < 0 ? (direction === 1 ? "top" : "bottom") : (direction === 1 ? "bottom" : "top")


	return (
		<div className={styles.root} style={{ flexDirection: direction === 1 ? "column" : "column-reverse" }}>
			<div className={styles.bar} style={{ height: `${percentage}%` }} />
			<div
				className={styles.value}
				style={{ color: value < 0 ? "#DDD" : "#222", [leading]: "0.5rem" }}
			>{value}</div>
		</div>
	)
}

export default Evaluation