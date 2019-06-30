import * as React from 'react'
import {useDispatch} from '../hooks/todos.js'
import {changeTodoTitle} from '../actions/todos.js'

const EditTodo = React.forwardRef(({ todo, onComplete }, ref) => {
  const dispatch = useDispatch()
  const [title, setTitle] = React.useState(todo.title);

  return (
    <input
      ref={ref}
      className="edit"
      value={title}
      onBlur={onComplete}
      onChange={(event) => setTitle(event.target.value)}
      onKeyPress={(event) => {
        if (event.key === 'Enter') {
          dispatch(changeTodoTitle(todo.id, title))
          onComplete()
        }
      }}
    />
  )
})

export default EditTodo
