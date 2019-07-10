import * as React from 'react'

import {useChannel} from './rc-react'
import {ServerAction} from './rc-react/types'

interface RoomListState {
  [name: string]: {name: string}
}

const createNewRoom: ServerAction = {type: 'CREATE', name: 'new_room', description: 'New Room'}

const RoomList: React.FC = () => {
  const [state, dispatch] = useChannel<RoomListState>('room_list', {})

  return (
    <>
      <ul>
        {Object.values(state).map((room) => <li>{room.name}</li>)}
      </ul>
      <button onClick={() => dispatch(createNewRoom)}>New Room</button>
    </>
  )
}

export default RoomList

