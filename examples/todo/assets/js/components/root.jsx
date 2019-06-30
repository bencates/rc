import * as React from 'react'
import {useTodos, TodosProvider} from '../hooks/todos'
import NewTodo from './new-todo.jsx'
import TodoList from './todo-list.jsx'
import TodoCount from './todo-count.jsx'
import ClearCompleted from './clear-completed.jsx'
import {getTodoCount} from '../selectors/todos'

const Root = () => {
  const [state, dispatch] = useTodos()

  const hasTodos = getTodoCount(state) > 0

  return (
    <TodosProvider value={[state, dispatch]}>
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
    </TodosProvider>
  )
}

export default Root
