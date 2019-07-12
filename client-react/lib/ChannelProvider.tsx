import * as React from 'react'
import {SocketConnectOption} from 'phoenix'

import {useSocket} from './hooks/socket'
import {useChannelRegistry} from './hooks/channelRegistry'

import {ContextState} from './types'

export const ChannelContext = React.createContext<ContextState>({
  isConnected: false,
  getChannel: ({}, initialState) => ({
    state: initialState,
    dispatch: async () => Promise.reject(new Error("no provider")),
  }),
  joinChannel: () => {},
  leaveChannel: () => {}
})

interface Props {
  endPoint: string
  opts: Partial<SocketConnectOption>
}

const ChannelProvider: React.FC<Props> = ({endPoint, opts, children}) => {
  const {socket, isConnected} = useSocket(endPoint, opts)

  // TODO: handle socket replacement if endpoint or opts change
  const {getChannel, joinChannel, leaveChannel} = useChannelRegistry(socket)

  return (
    <ChannelContext.Provider
      value={{
        isConnected,
        getChannel,
        joinChannel,
        leaveChannel
      }}
    >
      {children}
    </ChannelContext.Provider>
  )
}

export default ChannelProvider
