export function tryFrom<T extends Record<string, string | number>>(
  enumObject: T,
  value: unknown
): T[keyof T] | null {
  return (Object.values(enumObject) as unknown[]).includes(value) ? (value as T[keyof T]) : null
}

export function from<T extends Record<string, string | number>>(
  enumObject: T,
  value: unknown
): T[keyof T] {
  const result = tryFrom(enumObject, value)

  if (result === null) {
    throw new Error(`Invalid enum value: ${String(value)}`)
  }

  return result
}
