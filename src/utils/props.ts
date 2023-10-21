import { HTMLAttributes } from "react";

export const mergeProps = <Element extends HTMLElement>(original: HTMLAttributes<Element>, override: HTMLAttributes<Element> = {}): HTMLAttributes<Element> => {
	const result: HTMLAttributes<Element> = {}

	
	for (const key of ["style", "className"]) {
		const prop = key as keyof typeof result
		result[prop] = override[prop] ?? original[prop]
	}
	
	if (original.className && override.className) result.className = `${original.className} ${override.className}`
	if (original.style && override.style) result.style = { ...original.style, ...override.style }
	
	return result
}