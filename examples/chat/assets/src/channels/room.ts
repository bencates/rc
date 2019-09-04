// import { createAction } from 'redux-starter-kit'
import { createSelector } from 'reselect'

import { getChannelState } from '../store'
import useChannel from '../hooks/channel'

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

const channelName = (roomName: string): string => `room:${roomName}`

const initialState: State = { messages: [] }

//////////
// Hook //
//////////

export const useRoom = (roomName: string | null | false | undefined): void =>
  useChannel(roomName ? channelName(roomName) : null)

///////////////
// Selectors //
///////////////

export const createSelectors = (
  roomName: string | null | false | undefined,
) => {
  const getState = roomName
    ? getChannelState(channelName(roomName), initialState)
    : () => initialState

  const getMessages = createSelector(
    [getState],
    (state: State) => state.messages,
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
  return {
    newMessage: (text: string) => ({
      type: 'NEW_MESSAGE',
      payload: { text },
      meta: { phoenixChannel: channelName(roomName) },
    }),
  }
}
