import * as React from 'react'

import { useChannel } from '@rc/rc-react'

interface RoomListState {
  [name: string]: { name: string }
}

const createNewRoom = {
  type: 'CREATE',
  name: 'new_room',
  description: 'New Room',
}

const RoomList: React.FC = () => {
  const [state, dispatch] = useChannel<RoomListState>('room_list', {})

  return (
    <>
      <ul>
        {Object.values(state).map(room => (
          <li key={room.name}>{room.name}</li>
        ))}
      </ul>
      <button onClick={() => dispatch(createNewRoom)}>New Room</button>
    </>
  )
}

export default RoomList
