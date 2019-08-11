import * as React from 'react'
import styled from 'styled-components/macro'
import { useSelector } from 'react-redux'
import { Box, BoxProps, Paragraph } from 'grommet'

import { useRoom, createSelectors } from '../channels/room'

import Message from './Message'
import NewMessage from './NewMessage'

interface OwnProps {
  room: string | null
}

type Props = OwnProps & BoxProps

const ScrollBox = styled(Box)`
  overflow: scroll;
`

const ChatRoom: React.FC<Props> = ({ room: roomName, ...boxProps }) => {
  useRoom(roomName)

  const { getMessageGroups } = React.useMemo(() => createSelectors(roomName), [
    roomName,
  ])

  const messageGroups = useSelector(getMessageGroups)

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
      <ScrollBox as="section" pad="small">
        {messageGroups.map((messageGroup, idx) => (
          <Message key={idx} messageGroup={messageGroup} />
        ))}
      </ScrollBox>

      <NewMessage roomName={roomName} margin={{ top: 'auto' }} flex={false} />
    </Box>
  )
}

export default ChatRoom
