import * as React from 'react'
import { Box, BoxProps, Text } from 'grommet'

import NewRoom from './NewRoom'
import { useRoomList, getRooms } from '../channels/room-list'

const RoomList: React.FC<BoxProps> = props => {
  const [roomListState] = useRoomList()
  const rooms = getRooms(roomListState)

  return (
    <Box as="nav" background="neutral-3" {...props}>
      <Box as="ul" pad="small" style={{ listStyle: 'none' }}>
        {rooms.map(room => (
          <Text as="li" key={room} size="large">
            {room}
          </Text>
        ))}
      </Box>

      <NewRoom margin={{ top: 'auto' }} />
    </Box>
  )
}

export default RoomList
