import * as React from 'react'
import { useSelector } from 'react-redux'
import { Box, BoxProps, Paragraph } from 'grommet'

import { useRoom, createSelectors } from '../channels/room'

import Message from './Message'
import NewMessage from './NewMessage'

interface OwnProps {
  room: string | null
}

type Props = OwnProps & BoxProps

const ChatRoom: React.FC<Props> = ({ room: roomName, ...boxProps }) => {
  useRoom(roomName)

  const { getMessages } = React.useMemo(() => createSelectors(roomName), [
    roomName,
  ])

  const messages = useSelector(getMessages)

  if (roomName == null) {
    return (
      <Box {...boxProps} align="center" justify="center">
        <Paragraph size="xxlarge" color="dark-6">
          Pick a room
        </Paragraph>
      </Box>
    )
  }

  return (
    <Box {...boxProps}>
      <Box as="section" pad="small" style={{ overflow: 'scroll' }}>
        {messages.map(message => (
          <Message message={message} />
        ))}
      </Box>

      <NewMessage roomName={roomName} margin={{ top: 'auto' }} />
    </Box>
  )
}

export default ChatRoom
