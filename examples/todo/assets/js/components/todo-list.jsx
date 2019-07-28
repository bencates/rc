import * as React from 'react'
import { useChannel } from '@rc/rc-react'
import { useTodos, getTodos } from '../todos'

import Todo from './todo.jsx'
import ToggleAll from './toggle-all.jsx'

const TodoList = () => {
  const [state] = useTodos()

  const todos = getTodos(state)

  return (
    <section className="main">
      <ToggleAll />
      <ul className="todo-list">
        {todos.map(todo => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </ul>
    </section>
  )
}

export default TodoList
