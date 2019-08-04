import * as React from 'react'
import { useDispatch } from 'react-redux'

import { toggleTodoComplete, removeTodo } from '../channels/todos.js'

import EditTodo from './edit-todo.jsx'

const useFocus = isFocused => {
  const focusTargetRef = React.useRef()

  React.useEffect(() => {
    if (isFocused) {
      focusTargetRef.current.focus()
    }
  }, [isFocused])

  return focusTargetRef
}

const Todo = ({ todo }) => {
  const dispatch = useDispatch()

  const [isEditing, setEditing] = React.useState(false)
  const editTodoRef = useFocus(isEditing)

  const classNames = []
  if (isEditing) classNames.push('editing')
  if (todo.complete) classNames.push('completed')

  return (
    <li className={classNames.join(' ')}>
      {isEditing ? (
        <EditTodo
          ref={editTodoRef}
          todo={todo}
          onComplete={() => setEditing(false)}
        />
      ) : (
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.complete}
            onChange={() => dispatch(toggleTodoComplete(todo.id))}
          />

          <label onClick={() => setEditing(true)}>{todo.title}</label>

          <button
            className="destroy"
            onClick={() => dispatch(removeTodo(todo.id))}
          />
        </div>
      )}
    </li>
  )
}

export default Todo
