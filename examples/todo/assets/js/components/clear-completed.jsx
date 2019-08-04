import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { areAnyTodosComplete, clearCompletedTodos } from '../channels/todos'

const ClearCompleted = () => {
  const dispatch = useDispatch()

  const anyComplete = useSelector(areAnyTodosComplete)

  return (
    anyComplete && (
      <button
        className="clear-completed"
        onClick={() => dispatch(clearCompletedTodos())}
      >
        Clear completed
      </button>
    )
  )
}

export default ClearCompleted
