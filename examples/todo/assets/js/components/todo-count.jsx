import * as React from 'react'
import { useSelector } from 'react-redux'

import { getTodoCount } from '../channels/todos'

const TodoCount = () => {
  const todoCount = useSelector(getTodoCount)

  const count = todoCount === 0 ? 'no' : todoCount
  const plural = todoCount !== 1

  return (
    <span className="todo-count">
      <strong>{count}</strong> item{plural && 's'} left
    </span>
  )
}

export default TodoCount
