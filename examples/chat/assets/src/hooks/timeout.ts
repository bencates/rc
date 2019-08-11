import { useState, useEffect } from 'react'

export default (time: number | null): boolean => {
  const [timeoutExpired, setTimeoutExpired] = useState(false)

  useEffect(() => {
    if (time !== null) {
      setTimeoutExpired(false)
      const timeout = setTimeout(() => setTimeoutExpired(true), time)
      return () => clearTimeout(timeout)
    }
    return () => {}
  }, [time])

  return timeoutExpired
}
