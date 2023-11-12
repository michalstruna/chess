import { useEffect } from "react"

type Key = {
	key: string
	ctrl?: boolean
	alt?: boolean
	shift?: boolean
	handler: (e: KeyboardEvent) => void
}

export type UseKeyboardOptions = Key[]

const useKeyboard = (options: Key[]) => {

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			options.forEach(({ alt, ctrl, handler, key, shift }) => {
				if (e.key.toLowerCase() === key.toLowerCase() && !!e.altKey === !!alt && !!e.ctrlKey === !!ctrl && !!e.shiftKey === !!shift) {
					handler(e)
				}
			})
		}

		window.addEventListener("keydown", handleKeyDown)

		return () => {
			window.removeEventListener("keydown", handleKeyDown)
		}
	}, [options])

}

export default useKeyboard