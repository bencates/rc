import * as React from 'react'
import {useSelector} from '../hooks/todos'
import {getTodos} from '../selectors/todos'

import Todo from './todo.jsx'
import ToggleAll from './toggle-all.jsx'

const TodoList = () => {
  const todos = useSelector(getTodos)

  return (
    <section className="main">
      <ToggleAll />
      <ul className="todo-list">
        {todos.map((todo) => <Todo key={todo.id} todo={todo} />)}
      </ul>
    </section>
  )
}

export default TodoList
