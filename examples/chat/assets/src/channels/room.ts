import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createAction, createSelector } from 'redux-starter-kit'

import { phoenixActions, phoenixSelectors } from '../store'

export interface MessageGroup {
  sender: string
  messages: {
    text: string
    sentAt: Date
  }[]
}

export interface State {
  messages: {
    sender: string
    text: string
    sent_at: string
  }[]
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

  const getMessages = createSelector(
    [getState],
    (state: State) => state.messages.reverse(),
  )

  const getMessageGroups = createSelector(
    [getMessages],
    (messages: State['messages']) =>
      messages.reduce<MessageGroup[]>((messages, { sender, text, sent_at }) => {
        const lastMessage = messages.length
          ? messages[messages.length - 1]
          : false
        const sentAt = new Date(Date.parse(sent_at))

        if (!lastMessage || lastMessage.sender !== sender) {
          return [...messages, { sender, messages: [{ text, sentAt }] }]
        }

        lastMessage.messages.push({ text, sentAt })

        return messages
      }, []),
  )

  return { getState, getMessages, getMessageGroups }
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
