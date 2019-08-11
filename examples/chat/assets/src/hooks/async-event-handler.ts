import { useState, useCallback, DependencyList } from 'react'

interface EventCallback<Args extends any[]> {
  (...args: Args): Promise<void>
}

interface Event<Error, Args extends any[], Result> extends EventCallback<Args> {
  inProgress: boolean
  result: Result | null
  error: Error | null
}

export default <E = {}, A extends any[] = [], R = void>(
  event: (...args: A) => Promise<R>,
  deps: DependencyList,
): Event<E, A, R> => {
  const [inProgress, setInProgress] = useState(false)
  const [result, setResult] = useState<R | null>(null)
  const [error, setError] = useState<E | null>(null)

  const callback = useCallback(
    async (...args: A) => {
      setInProgress(true)
      setResult(null)
      setError(null)

      try {
        const result = await event(...args)
        setResult(result)
      } catch (error) {
        setError(error)
      } finally {
        setInProgress(false)
      }
    },
    // eslint-disable-next-line
    [...deps, setInProgress, setResult, setError],
  )

  return Object.assign(callback, { inProgress, result, error })
}
