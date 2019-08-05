import * as React from 'react'
import { useSelector } from 'react-redux'
import { Anchor, Box, BoxProps, Text } from 'grommet'
import { CaretNext } from 'grommet-icons'

import { useRoomList, getRooms } from '../channels/room-list'

import NewRoom from './NewRoom'

interface OwnProps {
  currentRoom: string | null
  setRoom: (r: string | null) => void
}

type Props = OwnProps & BoxProps

const RoomList: React.FC<Props> = ({ currentRoom, setRoom, ...boxProps }) => {
  useRoomList()

  const rooms = useSelector(getRooms)

  return (
    <Box background="neutral-3" {...boxProps}>
      <Box as="ul" pad="small" style={{ listStyle: 'none' }}>
        {rooms.map(room => (
          <Text as="li" key={room} size="large">
            <Anchor
              href={`#${room}`}
              label={room}
              onClick={() => setRoom(room)}
              icon={currentRoom === room ? <CaretNext /> : undefined}
            />
          </Text>
        ))}
      </Box>

      <NewRoom margin={{ top: 'auto' }} />
    </Box>
  )
}

export default RoomList
