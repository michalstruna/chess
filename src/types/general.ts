export type Setter<Value> = (setter: Value | ((prev: Value) => Value)) => void