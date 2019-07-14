import * as React from 'react'
import {useTodos, areAnyTodosComplete, clearCompletedTodos} from '../todos'

const ClearCompleted = () => {
  const [state, dispatch] = useTodos()

  const anyComplete = areAnyTodosComplete(state)

  return anyComplete && (
    <button
      className="clear-completed"
      onClick={() => dispatch(clearCompletedTodos())}
    >Clear completed</button>
  )
}

export default ClearCompleted
