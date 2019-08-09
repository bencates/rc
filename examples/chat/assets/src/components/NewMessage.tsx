import * as React from 'react'
import { useDispatch } from 'react-redux'
import { Box, BoxProps, Button, Form, FormField, TextInput } from 'grommet'

import { createActions } from '../channels/room'
import useAsyncEventHandler from '../hooks/async-event-handler'

interface OwnProps {
  roomName: string
}

type Props = OwnProps & BoxProps

const NewMessage: React.FC<Props> = ({ roomName, ...boxProps }) => {
  const dispatch = useDispatch()
  const roomActions = React.useMemo(() => createActions(roomName), [roomName])

  const [message, setMessage] = React.useState('')

  const handleSubmit = useAsyncEventHandler<string>(async () => {
    await dispatch(roomActions.newMessage(message))
    setMessage('')
  })

  return (
    <Box as="footer" pad="small" border="top" {...boxProps}>
      <Form onSubmit={handleSubmit}>
        <FormField error={handleSubmit.error}>
          <TextInput
            name="name"
            value={message}
            onChange={event => setMessage(event.target.value)}
            disabled={handleSubmit.inProgress}
          />
        </FormField>
        <Button type="submit" label="Message" />
      </Form>
    </Box>
  )
}

export default NewMessage
