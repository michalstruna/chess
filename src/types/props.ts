import { HTMLAttributes } from "react"

export type StylableProps = Pick<HTMLAttributes<HTMLElement>, "style" | "className">