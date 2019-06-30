import * as React from 'react'
import {useSelector, useDispatch} from '../hooks/todos'
import {areAnyTodosComplete} from '../selectors/todos'
import {clearCompletedTodos} from '../actions/todos'

const ClearCompleted = () => {
  const dispatch = useDispatch()
  const anyComplete = useSelector(areAnyTodosComplete)

  return anyComplete && (
    <button
      className="clear-completed"
      onClick={() => dispatch(clearCompletedTodos())}
    >Clear completed</button>
  )
}

export default ClearCompleted
