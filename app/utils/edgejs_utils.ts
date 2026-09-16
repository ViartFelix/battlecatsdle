/**
 * Throws an error upon called.
 * Should be used inside edgeJS templates where a prop is required.
 * Usage:
 * ```edge
 * @let(unit = $props.get('unit') ?? throwError('(your message here)'))
 * ```
 *
 * @param message
 */
export function throwError(message?: string): never {
  return (() => {
    throw new Error(message)
  })()
}
