import {useState, useRef, useEffect} from 'react'
import {Socket, SocketConnectOption} from 'phoenix'

export const useSocket = (endPoint: string, opts: Partial<SocketConnectOption>) => {
  const [isConnected, setIsConnected] = useState(false)
  const socket = useRef(new Socket(endPoint, opts))

  useEffect(() => {
    socket.current = new Socket(endPoint, opts)

    socket.current.onOpen(() => setIsConnected(true))
    socket.current.onClose(() => setIsConnected(false))

    socket.current.connect()

    return () => {
      socket.current && socket.current.disconnect()
    }
  }, [endPoint, opts])

  return {socket, isConnected}
}

