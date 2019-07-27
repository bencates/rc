import * as React from 'react'
import { Box, BoxProps, Paragraph } from 'grommet'

interface OwnProps {
  room: string | null
}

type Props = OwnProps & BoxProps

const ChatRoom: React.FC<Props> = ({ room: roomName, ...boxProps }) => {
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
    <Box {...boxProps}>{roomName}</Box>
  )
}

export default ChatRoom
