import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createSelector } from 'redux-starter-kit'

import { phoenixActions, phoenixSelectors } from '../store'

export interface State {
  [name: string]: {}
}

const channelName = (roomName: string) => `room:${roomName}`

const initialState: State = {}

//////////
// Hook //
//////////

export const useRoom = (roomName: string | null | false | undefined) => {
  const dispatch = useDispatch()
  const socketConnected = useSelector(phoenixSelectors.getConnectionStatus)

  useEffect(() => {
    if (roomName && socketConnected) {
      dispatch(
        phoenixActions.joinChannel({
          channelName: channelName(roomName),
          initialState,
        }),
      )
      return () => {
        dispatch(
          phoenixActions.leaveChannel({ channelName: channelName(roomName) }),
        )
      }
    }
    return () => {}
  }, [roomName, dispatch, socketConnected])
}

///////////////
// Selectors //
///////////////

export const createSelectors = (
  roomName: string | null | false | undefined,
) => {
  const getState = roomName
    ? phoenixSelectors.getChannelState(`room:${roomName}`, initialState)
    : () => initialState

  return {
    getState,
    getRooms: createSelector(
      [getState],
      (state: State) => Object.keys(state),
    ),
  }
}

/////////////
// Actions //
/////////////

export const createActions = (roomName: string) => ({})
