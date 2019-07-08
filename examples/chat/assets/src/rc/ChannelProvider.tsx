import * as React from 'react'
import {Channel, SocketConnectOption} from 'phoenix'

import {useSocket} from './hooks/socket'

interface ContextState {
  isConnected: boolean
}

export const SocketContext = React.createContext<ContextState>({
  isConnected: false
})

interface Props {
  endPoint: string
  opts: Partial<SocketConnectOption>
}

const SocketProvider: React.FC<Props> = ({endPoint, opts, children}) => {
  const {isConnected} = useSocket(endPoint, opts)

  return (
    <SocketContext.Provider
      value={{isConnected}}
    >
      {children}
    </SocketContext.Provider>
  )
}

export default SocketProvider
