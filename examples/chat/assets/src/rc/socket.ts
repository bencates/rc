import {ComponentType, Context, createElement, createContext, useContext} from 'react'
import {Socket, SocketConnectOption} from 'phoenix'

const SocketContext = createContext(null) as Context<null | Socket>

export const withSocket = (
  url: string,
  config: Partial<SocketConnectOption> = {},
  component: ComponentType
) => {
  const socket = new Socket(url, config)

  socket.connect()

  return (props: object) => createElement(
    SocketContext.Provider,
    {value: socket},
    createElement(component, props)
  )
}

export const useSocket = () => useContext(SocketContext)
