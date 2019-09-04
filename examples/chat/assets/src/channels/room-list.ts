import { createSelector } from 'reselect'
import { createChannelAction } from 'redux-reducer-channel'

import { getChannelState } from '../store'
import useChannel from '../hooks/channel'

export interface State {
  [name: string]: {}
}

const channelName = 'room_list'

const initialState: State = {}

//////////
// Hook //
//////////

export const useRoomList = (): void => useChannel(channelName)

///////////////
// Selectors //
///////////////

const getState = getChannelState(channelName, initialState)

export const getRooms = createSelector(
  [getState],
  (state: State) => Object.keys(state),
)

/////////////
// Actions //
/////////////

export const createRoom = createChannelAction(
  'CREATE',
  channelName,
  (name: string) => ({ name }),
)
