import { Coordinates } from "@/types/game";

export const isSameCoordinates = (coordinates1: Coordinates, coordinates2: Coordinates): boolean => {
	return coordinates1.every((coordinate, i) => coordinate === coordinates2[i])
}

export const hasCoordinates = (allCoordinates: Coordinates[], coordinates: Coordinates): boolean => {
	return allCoordinates.some(it => isSameCoordinates(coordinates, it))
}