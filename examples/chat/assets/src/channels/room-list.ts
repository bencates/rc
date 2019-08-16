import { createSelector } from 'redux-starter-kit'

import { phoenixActions, phoenixSelectors } from '../store'
import useChannel from '../hooks/channel'

export interface State {
  [name: string]: {}
}

const channelName = 'room_list'

const initialState: State = {}

//////////
// Hook //
//////////

export const useRoomList = () => useChannel(channelName, initialState)

///////////////
// Selectors //
///////////////

const getState = phoenixSelectors.getChannelState(channelName, initialState)

export const getRooms = createSelector(
  [getState],
  (state: State) => Object.keys(state),
)

/////////////
// Actions //
/////////////

export const createRoom = (name: string) => ({
  type: 'CREATE',
  payload: { name },
  meta: { phoenixChannel: channelName },
})
