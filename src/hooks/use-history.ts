import { useMemo, useState } from "react"

export type UseHistoryOptions<Item> = {
	defaultHistory?: Item[]
	defaultUndo?: Item[]
}

export type UseHistoryActions<Item> = {
	push: (item: Item) => void
	undo: () => void
	canUndo: () => boolean
	redo: () => void
	canRedo: () => boolean
}

const useHistory = <Item>({ defaultHistory, defaultUndo }: UseHistoryOptions<Item>): UseHistoryActions<Item> => {
	const [history, setHistory] = useState(defaultHistory ?? [])
	const [undo, setUndo] = useState(defaultUndo ?? [])

	return useMemo(() => {
		const canRedo = () => undo.length > 0
		const canUndo = () => history.length > 1

		return {
			canRedo,
			push: (item) => {
				setHistory(prev => [...prev, item])
				setUndo([])
			},
			canUndo,
			redo: () => {
				if (!canRedo()) return
				const item = undo[undo.length - 1]
				setHistory(prev => [...prev, item])
				setUndo(prev => prev.slice(0, -1))
			},
			undo: () => {
				if (!canUndo()) return
				const item = history[history.length - 1]
				setHistory(prev => prev.slice(0, -1))
				setUndo(prev => [...prev, item])
			}
		}
	}, [history, undo])
}

export default useHistory