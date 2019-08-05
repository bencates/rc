import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createSelector } from 'redux-starter-kit'

import { phoenixActions, phoenixSelectors } from '../store'

export interface State {
  [name: string]: {}
}

const channelName = 'room_list'

const initialState: State = {}

//////////
// Hook //
//////////

export const useRoomList = () => {
  const dispatch = useDispatch()
  const socketConnected = useSelector(phoenixSelectors.getConnectionStatus)

  useEffect(() => {
    if (socketConnected) {
      dispatch(phoenixActions.joinChannel({ channelName, initialState }))
      return () => {
        dispatch(phoenixActions.leaveChannel({ channelName }))
      }
    }
    return () => {}
  }, [dispatch, socketConnected])
}

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
