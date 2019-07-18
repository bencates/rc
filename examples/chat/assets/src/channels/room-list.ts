import { Action } from '@rc/rc'
import { useChannel } from '@rc/rc-react'

///////////
// State //
///////////

export interface State {
  [name: string]: {}
}

const initialState: State = {}

//////////
// Hook //
//////////

export const useRoomList = () => useChannel<State>('room_list', initialState)

///////////////
// Selectors //
///////////////

export const getRooms = (state: State) => Object.keys(state)

/////////////
// Actions //
/////////////

export const createRoom = (name: string): Action => ({ type: 'CREATE', name })
