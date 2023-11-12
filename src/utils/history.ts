export type HistoryOptions<Item> = {
	defaultHistory?: Item[]
	defaultUndo?: Item[]
	onChange?: (historyList: Item[], undoList: Item[]) => void
}

export type HistoryChange<Item> = {
	current: Item
	changed: Item
}

export default class History<Item> {

	private historyList: Item[]
	private undoList: Item[]
	private onChange?: (historyList: Item[], undoList: Item[]) => void

	public constructor({ defaultHistory, defaultUndo, onChange }: HistoryOptions<Item> = {}) {
		this.historyList = defaultHistory ?? []
		this.undoList = defaultUndo ?? []
		this.onChange = onChange
	}

	public canUndo(): boolean {
		return this.historyList.length > 0
	}

	public canRedo(): boolean {
		return this.undoList.length > 0
	}

	public push(item: Item): void {
		this.historyList.push(item)
		this.undoList.slice(0, 0)
		this.onChange?.(this.historyList, this.undoList)
	}

	public undo(): HistoryChange<Item> {
		if (!this.canUndo()) throw new Error("Can't undo.")
		const item = this.historyList.pop()!
		this.undoList.push(item)
		this.onChange?.(this.historyList, this.undoList)
		return { changed: item, current: this.historyList[this.historyList.length - 1] }
	}

	public redo(): HistoryChange<Item> {
		if (!this.canRedo()) throw new Error("Can't redo.")
		const item = this.undoList.pop()!
		this.historyList.push(item)
		this.onChange?.(this.historyList, this.undoList)
		return { changed: item, current: item }
	}

	public toArray(): Item[] {
		return this.historyList
	}

}