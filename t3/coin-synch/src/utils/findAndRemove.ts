export const findAndRemove = <T>(
  arr: T[],
  predicate: (item: T) => boolean
): T | undefined => {
  const index = arr.findIndex(predicate)

  if (index === -1) {
    return undefined
  }

  return arr.splice(index, 1)[0]
}
