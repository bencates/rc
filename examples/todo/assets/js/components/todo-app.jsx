import * as React from 'react'
import NewTodo from './new-todo.jsx'
import TodoList from './todo-list.jsx'
import TodoCount from './todo-count.jsx'
import ClearCompleted from './clear-completed.jsx'
import {useTodos, getTodoCount} from '../todos'

const TodoApp = () => {
  const [state] = useTodos()

  const hasTodos = getTodoCount(state) > 0

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <NewTodo />
      </header>

      {hasTodos && <>
        <TodoList />

        <footer className="footer">
          <TodoCount />

          {/* Remove this if you don't implement routing */}
          {/*
          <ul className="filters">
            <li>
              <a className="selected" href="#/">All</a>
            </li>
            <li>
              <a href="#/active">Active</a>
            </li>
            <li>
              <a href="#/completed">Completed</a>
            </li>
          </ul>
          */}

          <ClearCompleted />
        </footer>
      </>}
    </section>
  )
}

export default TodoApp

