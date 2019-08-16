import { createSelector } from 'redux-starter-kit'
import { SocketConnectOption } from 'phoenix'

interface SocketState {
  connected: boolean
  endPoint: string
  opts: Partial<SocketConnectOption>
}

interface ChannelState {
  state: any
}

export interface State {
  socket: null | SocketState
  channels: { [name: string]: ChannelState }
}

export default <RootState extends any>(
  getState: (state: RootState) => State,
) => ({
  getConnectionStatus: createSelector<RootState, boolean>(
    [getState],
    (state: State) => !!(state.socket && state.socket.connected),
  ),

  getChannelState<ChannelState extends any>(
    channelName: string,
    initialState: ChannelState,
  ) {
    return createSelector<RootState, ChannelState>(
      [getState],
      (state: State) => {
        if (state.channels[channelName]) {
          return state.channels[channelName].state
        } else {
          return initialState
        }
      },
    )
  },
})
