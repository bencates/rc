import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createAction, createSelector } from 'redux-starter-kit'

import { phoenixActions, phoenixSelectors } from '../store'

interface Message {
  sender: string
  text: string
}

export interface State {
  messages: Message[]
}

const channelName = (roomName: string) => `room:${roomName}`

const initialState: State = { messages: [] }

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

    getMessages: createSelector(
      [getState],
      (state: State) => state.messages,
    ),
  }
}

/////////////
// Actions //
/////////////

export const createActions = (roomName: string) => {
  const createServerAction = roomName
    ? <T>(payload: T) => ({
        payload,
        meta: { phoenixChannel: `room:${roomName}` },
      }) // </T>
    : <T>(payload: T) => ({ payload }) // </T>

  return {
    newMessage: createAction('NEW_MESSAGE', (text: string) =>
      createServerAction({ text }),
    ),
  }
}
