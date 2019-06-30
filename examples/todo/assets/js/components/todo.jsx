import * as React from 'react'
import {useDispatch} from '../hooks/todos.js'
import {toggleTodoComplete, removeTodo} from '../actions/todos.js'

import EditTodo from './edit-todo.jsx'

// List items should get the className `editing` when editing and `completed`
// when marked as completed
const Todo = ({ todo }) => {
  const dispatch = useDispatch()
  const [isEditing, setEditing] = React.useState(false);
  const editTodoRef = React.useRef();

  const classNames = []
  if (isEditing) classNames.push('editing')
  if (todo.complete) classNames.push('completed')

  const startEditing = () => setEditing(true)
  const stopEditing = () => setEditing(false)

  React.useEffect(() => {
    if (isEditing) {
      editTodoRef.current.focus()
    }
  }, [isEditing])

  return (
    <li className={classNames.join(' ')}>
      {isEditing ? (
        <EditTodo ref={editTodoRef} todo={todo} onComplete={stopEditing} />
      ) : (
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.complete}
            onChange={() => dispatch(toggleTodoComplete(todo.id))}
          />

          <label onClick={() => setEditing(true)}>
            {todo.title}
          </label>

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
