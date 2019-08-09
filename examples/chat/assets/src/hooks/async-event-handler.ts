import { useState } from 'react'

interface Event<Error, Args extends any[], Result> {
  (...args: Args): Promise<null>
  inProgress: boolean
  result: Result | null
  error: Error | null
}

export default <E = {}, A extends any[] = [], R = void>(
  event: (...args: A) => Promise<R>,
): Event<E, A, R> => {
  const [inProgress, setInProgress] = useState(false)
  const [result, setResult] = useState<R | null>(null)
  const [error, setError] = useState<E | null>(null)

  const handleEvent: Event<E, A, R> = async (...args: A) => {
    setInProgress(true)
    setError(null)
    try {
      const result = event(...args)
    } catch (error) {
      setError(error)
    } finally {
      setInProgress(false)
      return null
    }
  }

  handleEvent.inProgress = inProgress
  handleEvent.result = result
  handleEvent.error = error

  return handleEvent
}
