import { State } from './reducer'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RootState = any

export interface Selectors {
  isConnected(rootState: RootState): boolean

  getChannelState<ChannelState extends {}>(
    channelName: string,
    initialState: ChannelState,
  ): (rootState: RootState) => ChannelState
}

export default function(getState: (rootState: RootState) => State): Selectors {
  return {
    isConnected: (rootState: RootState): boolean => {
      const state = getState(rootState)
      return !!(state.socket && state.socket.connected)
    },

    getChannelState<ChannelState>(
      channelName: string,
      initialState: ChannelState,
    ) {
      return (rootState: RootState): ChannelState => {
        const state = getState(rootState)
        if (
          state.channels[channelName] &&
          'state' in state.channels[channelName]
        ) {
          // NB: We are explicitly typecasting to the provided state type.
          //
          // The type of the state is dictated by the server and varies widely
          // from channel to channel, so there's not much we can do at build
          // time to validate the types aside from trust that the user's type
          // definition properly documents the server state.
          return state.channels[channelName].state as ChannelState
        } else {
          return initialState
        }
      }
    },
  }
}
