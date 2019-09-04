import { State } from './reducer'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RootState = any

export interface Selectors {
  /** Checks whether the socket connection has been initiated */
  hasSocket(rootState: RootState): boolean

  /** Checks whether the socket is connected */
  isConnected(rootState: RootState): boolean

  /** Checks whether a channel has been joined */
  hasChannel(channelName: string): (rootState: RootState) => boolean

  /**
   * Retrieves the channel state, if it exists, or the provided initial state.
   *
   * Note that this explictly typecasts the channel's state to the
   * `ChannelState` type (which is inferred from `initialState` by default).
   *
   * The type of the state is dictated by the server and varies widely
   * from channel to channel, so there's not much we can do at build
   * time to validate the types aside from trust that the user's type
   * definition properly documents the server state. However, assuming the
   * server state is documented correctly this will insure type safety
   * throughout the rest of the program.
   */
  getChannelState<ChannelState extends {}>(
    channelName: string,
    initialState: ChannelState,
  ): (rootState: RootState) => ChannelState
}

export default function(getState: (rootState: RootState) => State): Selectors {
  return {
    hasSocket: (rootState: RootState): boolean => {
      const state = getState(rootState)
      return !!state.socket
    },

    isConnected: (rootState: RootState): boolean => {
      const state = getState(rootState)
      return !!(state.socket && state.socket.connected)
    },

    hasChannel: (channelName: string) => (rootState: RootState): boolean => {
      const state = getState(rootState)
      return channelName in state.channels
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
          return state.channels[channelName].state as ChannelState
        } else {
          return initialState
        }
      }
    },
  }
}
