import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { areAllTodosComplete, toggleAllTodosComplete } from '../channels/todos'

const ToggleAll = () => {
  const dispatch = useDispatch()

  const allComplete = useSelector(areAllTodosComplete)

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
