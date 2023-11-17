export type HistoryOptions<Item> = {
	defaultHistory?: Item[]
	defaultUndo?: Item[]
}

export type HistoryChange<Item> = {
	current: Item
	changed: Item
}

export default class History<Item> {

	private historyList: Item[]
	private undoList: Item[]

	public constructor({ defaultHistory, defaultUndo }: HistoryOptions<Item> = {}) {
		this.historyList = defaultHistory ?? []
		this.undoList = defaultUndo ?? []
	}

	public canUndo(): boolean {
		return this.historyList.length > 0
	}

	public canRedo(): boolean {
		return this.undoList.length > 0
	}

	public push(item: Item): void {
		this.historyList.push(item)
		this.undoList = []
	}

	public undo(): HistoryChange<Item> {
		if (!this.canUndo()) throw new Error("Can't undo.")
		const item = this.historyList.pop()!
		this.undoList.push(item)
		return { changed: item, current: this.historyList[this.historyList.length - 1] }
	}

	public redo(): HistoryChange<Item> {
		if (!this.canRedo()) throw new Error("Can't redo.")
		const item = this.undoList.pop()!
		this.historyList.push(item)
		return { changed: item, current: item }
	}

	public toArray(): Item[] {
		return this.historyList
	}

}