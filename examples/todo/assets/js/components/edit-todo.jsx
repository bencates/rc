import * as React from 'react'
import { useDispatch } from 'react-redux'

import { changeTodoTitle } from '../channels/todos.js'

const EditTodo = React.forwardRef(({ todo, onComplete }, ref) => {
  const dispatch = useDispatch()
  const [title, setTitle] = React.useState(todo.title)

  return (
    <input
      ref={ref}
      className="edit"
      value={title}
      onBlur={onComplete}
      onChange={event => setTitle(event.target.value)}
      onKeyPress={async event => {
        if (event.key === 'Enter') {
          await dispatch(changeTodoTitle(todo.id, title))
          onComplete()
        }
      }}
    />
  )
})

export default EditTodo
