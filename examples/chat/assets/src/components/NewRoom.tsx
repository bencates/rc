import * as React from 'react'
import { useDispatch } from 'react-redux'
import { Box, BoxProps, Button, Form, FormField, TextInput } from 'grommet'

import { createRoom } from '../channels/room-list'

interface CreateRoomEvent extends React.FormEvent<HTMLFormElement> {
  value: { name: string }
}

const NewRoom: React.FC<BoxProps> = props => {
  const dispatch = useDispatch()

  const [name, setName] = React.useState('')
  const [disabled, setDisabled] = React.useState(false)
  const [error, setError] = React.useState<string | boolean>(false)

  const handleSubmit = async (event: CreateRoomEvent) => {
    setDisabled(true)
    setError(false)
    try {
      await dispatch(createRoom(name))
      setName('')
    } catch (err) {
      setError(err.toString())
    } finally {
      setDisabled(false)
    }
  }

  return (
    <Box background="accent-3" pad="small" {...props}>
      <Form onSubmit={handleSubmit}>
        <FormField label="Name" error={error}>
          <TextInput
            name="name"
            value={name}
            onChange={event => setName(event.target.value)}
            disabled={disabled}
          />
        </FormField>
        <Button type="submit" label="Create Room" fill="horizontal" />
      </Form>
    </Box>
  )
}

export default NewRoom
