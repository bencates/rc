import * as React from 'react'
import { useChannel } from '@rc/rc-react'
import { useTodos, createTodo } from '../todos'

const NewTodo = () => {
  const [{}, dispatch] = useTodos()
  const [title, setTitle] = React.useState('')

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
