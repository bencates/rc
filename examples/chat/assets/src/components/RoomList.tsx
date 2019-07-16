import * as React from 'react'
import styled from 'styled-components'
import { Box, BoxProps, Button, Text } from 'grommet'

import { useChannel } from '@rc/rc-react'

interface RoomListState {
  [name: string]: { name: string }
}

const UL = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

const createNewRoom = {
  type: 'CREATE',
  name: 'new_room_2',
  description: 'New Room',
}

const RoomList: React.FC<BoxProps> = props => {
  const [state, dispatch] = useChannel<RoomListState>('room_list', {})

  return (
    <Box as="nav" background="neutral-3" pad="small" {...props}>
      <UL>
        {Object.values(state).map(room => (
          <Text as="li" key={room.name} size="large">
            {room.name}
          </Text>
        ))}
      </UL>

      <Button
        label="New Room"
        margin={{ top: 'auto' }}
        color="accent-3"
        onClick={() => dispatch(createNewRoom)}
      />
    </Box>
  )
}

export default RoomList
