import * as React from 'react'
import {Socket, SocketConnectOption} from 'phoenix'

export const SocketContext = React.createContext({
  socket: new Socket(''),
  isConnected: false
})

interface Props {
  endPoint: string
  opts: Partial<SocketConnectOption>
}

const SocketProvider: React.FC<Props> = ({endPoint, opts, children}) => {
  const [isConnected, setIsConnected] = React.useState(false)

  const socket: React.MutableRefObject<null | Socket> = React.useRef(null)

  React.useEffect(() => {
    socket.current = new Socket(endPoint, opts)

    socket.current.onOpen(() => setIsConnected(true))
    socket.current.onClose(() => setIsConnected(false))

    socket.current.connect()

    return () => { socket.current && socket.current.disconnect() }
  }, [endPoint, opts, setIsConnected])

  return (
    <SocketContext.Provider value={{socket: socket.current!, isConnected}}>
      {children}
    </SocketContext.Provider>
  )
}

export default SocketProvider
