import { useMemo } from 'react'

/**
 * A hook to generate a uuid
 * @ref https://www.30secondsofcode.org/js/s/uuid-generator-browser
 */
export const useUUID = () => {
  return useMemo(() => {
    // @ts-ignore
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
    )
  }, [])
}

class IdGenerator {
  id: number = 0
  next = () => {
    return ++this.id
  }
}

const idGenerator = new IdGenerator()

/**
 * A hook to generate a uid
 */
export const useUID = (prefix?: string) => {
  return useMemo(() => {
    return prefix + '-' + idGenerator.next()
  }, [prefix])
}
