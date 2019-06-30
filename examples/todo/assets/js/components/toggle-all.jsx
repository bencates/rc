import * as React from 'react'
import {useSelector, useDispatch} from '../hooks/todos'
import {areAllTodosComplete} from '../selectors/todos'
import {toggleAllTodosComplete} from '../actions/todos'

const ToggleAll = () => {
  const dispatch = useDispatch()

  const allComplete = useSelector(areAllTodosComplete)

  return <>
    <input
      id="toggle-all"
      className="toggle-all"
      type="checkbox"
      checked={allComplete}
      onChange={() => dispatch(toggleAllTodosComplete())}
    />
    <label htmlFor="toggle-all">Mark all as complete</label>
  </>
}

export default ToggleAll
