import * as React from 'react'
import { Box, BoxProps, Paragraph } from 'grommet'

import { useRoom, createSelectors } from '../channels/room'

interface OwnProps {
  room: string | null
}

type Props = OwnProps & BoxProps

const ChatRoom: React.FC<Props> = ({ room: roomName, ...boxProps }) => {
  useRoom(roomName)

  const roomSelectors = React.useMemo(() => createSelectors(roomName), [
    roomName,
  ])

  if (roomName == null) {
    return (
      <Box {...boxProps} align="center" justify="center">
        <Paragraph size="xxlarge" color="dark-6">
          Pick a room
        </Paragraph>
      </Box>
    )
  }

  return <Box {...boxProps}>{roomName}</Box>
}

export default ChatRoom
