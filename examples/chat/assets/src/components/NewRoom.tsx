import * as React from 'react'
import { useDispatch } from 'react-redux'
import { Box, BoxProps, Button, Form, FormField, TextInput } from 'grommet'

import { createRoom } from '../channels/room-list'
import useAsyncEventHandler from '../hooks/async-event-handler'

interface CreateRoomEvent extends React.FormEvent<HTMLFormElement> {
  value: { name: string }
}

const NewRoom: React.FC<BoxProps> = props => {
  const dispatch = useDispatch()

  const [name, setName] = React.useState('')

  const handleSubmit = useAsyncEventHandler<string>(async () => {
    await dispatch(createRoom(name))
    setName('')
  })

  return (
    <Box background="accent-3" pad="small" {...props}>
      <Form onSubmit={handleSubmit}>
        <FormField label="Name" error={handleSubmit.error}>
          <TextInput
            name="name"
            value={name}
            onChange={event => setName(event.target.value)}
            disabled={handleSubmit.inProgress}
          />
        </FormField>
        <Button type="submit" label="Create Room" fill="horizontal" />
      </Form>
    </Box>
  )
}

export default NewRoom
