import * as React from 'react'
import {useChannel} from '@rc/rc-react'
import {useTodos, getTodoCount} from '../todos'

const TodoCount = () => {
  const [state] = useTodos()

  const todoCount = getTodoCount(state)

  const count = todoCount === 0 ? 'no' : todoCount
  const plural = todoCount !== 1

  return (
    <span className="todo-count">
      <strong>{count}</strong> item{plural && 's'} left
    </span>
  )
}

export default TodoCount
