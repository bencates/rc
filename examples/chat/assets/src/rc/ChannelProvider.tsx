import * as React from 'react'
import {Channel, SocketConnectOption} from 'phoenix'

import {useSocket} from './hooks/socket'
import {useChannelRegistry} from './hooks/channelRegistry'

import {ServerAction, ContextState} from './types'

export const ChannelContext = React.createContext<ContextState>({
  isConnected: false,
  getChannel: (name, initialState) => ({
    channel: new Channel(name),
    state: initialState,
    dispatch: async (action: ServerAction) => Promise.reject(new Error("no provider")),
    refCount: 0
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


interface Dispatch {
  (o: {type: 'Foo'}): Promise<string>;
  (o: {type: 'Bar'}): Promise<number>;
}

const doFooWithoutAssertion = () => ({type: 'foo'})
const doFoo = (): ServerAction<string> => ({type: 'foo'})

const dispatch = <T extends {}>(a: ServerAction<T>): Promise<T> => Promise.resolve('asdf') as unknown as Promise<T>;

dispatch({type: 'Foo'}) // => Promise<void>

dispatch(doFoo()) // => Promise<string>
