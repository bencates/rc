import * as React from 'react'
import { useDispatch } from 'react-redux'

import { createTodo } from '../channels/todos'

const NewTodo = () => {
  const [title, setTitle] = React.useState('')
  const dispatch = useDispatch()

  return (
    <input
      className="new-todo"
      placeholder="What needs to be done?"
      autoFocus
      value={title}
      onChange={event => setTitle(event.target.value)}
      onKeyPress={async event => {
        if (event.key === 'Enter') {
          await dispatch(createTodo(title))
          setTitle('')
        }
      }}
    />
  )
}

export default NewTodo
