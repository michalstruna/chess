import { useState } from "react"

export type UseForceUpdateResult = () => void

const useForceUpdate = (): UseForceUpdateResult => {

	const [_, set_] = useState([])

	return () => {
		set_([])
	}

}

export default useForceUpdate