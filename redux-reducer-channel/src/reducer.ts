import { Reducer } from 'redux'
import { SocketConnectOption } from 'phoenix'
import { apply_patch as applyPatch } from 'jsonpatch'

import { Actions, ActionType as Action } from './actions'

interface SocketState {
  connected: boolean
  endPoint: string
  opts: Partial<SocketConnectOption>
}

interface ChannelState<T> {
  state?: T
}

export interface State {
  socket: null | SocketState
  channels: { [name: string]: ChannelState<unknown> }
}

const initialState = { socket: null, channels: {} }

export default function createReducer(
  actions: Actions,
): Reducer<State, Action> {
  return function(state: State = initialState, action: Action): State {
    if (actions.connectToSocket.isAction(action)) {
      return { ...state, socket: { ...action.payload, connected: false } }
    }

    if (actions.joinChannel.isAction(action)) {
      return {
        ...state,
        channels: { ...state.channels, [action.payload.channelName]: {} },
      }
    }

    if (actions.leaveChannel.isAction(action)) {
      const { [action.payload.channelName]: _, ...channels } = state.channels
      return { ...state, channels }
    }

    if (actions.setState.isAction(action)) {
      return {
        ...state,
        channels: {
          ...state.channels,
          [action.payload.channelName]: {
            ...state.channels[action.payload.channelName],
            state: action.payload.state,
          },
        },
      }
    }

    if (actions.patchState.isAction(action)) {
      return {
        ...state,
        channels: {
          ...state.channels,
          [action.payload.channelName]: {
            ...state.channels[action.payload.channelName],
            state: applyPatch(
              state.channels[action.payload.channelName].state,
              action.payload.patch,
            ),
          },
        },
      }
    }

    // TODO: These three actions have empty payloads. Since that makes them
    // supertypes of all the others they need to be last, otherwise Typescript
    // gets confused. I'd like to find a way to do the type narrowing that
    // doesn't require this, but it'll work in the meantime.

    if (actions.socketConnected.isAction(action)) {
      return state.socket
        ? { ...state, socket: { ...state.socket, connected: true } }
        : state
    }

    if (actions.socketDisconnected.isAction(action)) {
      return state.socket
        ? { ...state, socket: { ...state.socket, connected: false } }
        : state
    }

    if (actions.disconnectFromSocket.isAction(action)) {
      return { ...state, socket: null }
    }

    return state
  }
}
