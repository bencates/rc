import * as React from 'react'
import { useTodos, areAllTodosComplete, toggleAllTodosComplete } from '../todos'

const ToggleAll = () => {
  const [state, dispatch] = useTodos()

  const allComplete = areAllTodosComplete(state)

  return (
    <>
      <input
        id="toggle-all"
        className="toggle-all"
        type="checkbox"
        checked={allComplete}
        onChange={() => dispatch(toggleAllTodosComplete())}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
    </>
  )
}

export default ToggleAll
