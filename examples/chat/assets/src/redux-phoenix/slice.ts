import { createSlice, PayloadAction } from 'redux-starter-kit'
import { SocketConnectOption } from 'phoenix'
import { apply_patch as applyPatch } from 'jsonpatch'
// import { phoenixMiddleware } from './redux-phoenix'

import createSelectors from './selectors'
import createMiddleware from './middleware'

export interface State {
  socket: null | {
    connected: boolean
    endPoint: string
    opts: Partial<SocketConnectOption>
  }
  channels: { [name: string]: { state: any } }
}

export const createPhoenixSlice = (
  sliceNamespace: string | undefined = undefined,
) => {
  const slice = createSlice({
    slice: sliceNamespace,
    initialState: {
      socket: null,
      channels: {},
    } as State,
    reducers: {
      connectToSocket(
        state,
        {
          payload: { endPoint, opts },
        }: PayloadAction<{
          endPoint: string
          opts: Partial<SocketConnectOption>
        }>,
      ) {
        state.socket = { endPoint, opts, connected: false }
      },

      socketConnected(state) {
        state.socket && (state.socket.connected = true)
      },

      socketDisconnected(state) {
        state.socket && (state.socket.connected = false)
      },

      disconnectFromSocket(state) {
        state.socket = null
      },

      joinChannel(
        state,
        {
          payload: { channelName, initialState },
        }: PayloadAction<{ channelName: string; initialState: any }>,
      ) {
        state.channels[channelName] = { state: initialState }
      },

      leaveChannel(
        state,
        { payload: { channelName } }: PayloadAction<{ channelName: string }>,
      ) {
        delete state.channels[channelName]
      },

      setState(
        state,
        {
          payload: { channelName, state: serverState },
        }: PayloadAction<{ channelName: string; state: any }>,
      ) {
        if (state.channels[channelName]) {
          state.channels[channelName].state = serverState
        }
      },

      patchState(
        state,
        {
          payload: { channelName, patch },
        }: PayloadAction<{ channelName: string; patch: any }>,
      ) {
        if (state.channels[channelName]) {
          state.channels[channelName].state = applyPatch(
            state.channels[channelName].state,
            patch,
          )
        }
      },
    },
  })

  const getSlice = sliceNamespace
    ? slice.selectors[
        'get' + sliceNamespace.charAt(0).toUpperCase() + sliceNamespace.slice(1)
      ]
    : slice.selectors.getState

  return {
    reducer: slice.reducer,
    actions: slice.actions,
    selectors: createSelectors(getSlice),
    middleware: createMiddleware(slice.actions),
  }
}
