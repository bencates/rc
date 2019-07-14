import * as React from 'react'
import {useTodos, changeTodoTitle} from '../todos.js'

const EditTodo = React.forwardRef(({ todo, onComplete }, ref) => {
  const [{}, dispatch] = useTodos()
  const [title, setTitle] = React.useState(todo.title);

  return (
    <input
      ref={ref}
      className="edit"
      value={title}
      onBlur={onComplete}
      onChange={(event) => setTitle(event.target.value)}
      onKeyPress={async (event) => {
        if (event.key === 'Enter') {
          await dispatch(changeTodoTitle(todo.id, title))
          onComplete()
        }
      }}
    />
  )
})

export default EditTodo
