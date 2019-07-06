import {ComponentType, createElement, useContext} from 'react'
import {SocketConnectOption} from 'phoenix'
import SocketProvider, {SocketContext} from './SocketProvider'

export const withSocket = (
  endPoint: string,
  opts: Partial<SocketConnectOption> = {},
  component: ComponentType
) => {
  return (props: object) => createElement(
    SocketProvider,
    {endPoint, opts},
    createElement(component, props)
  )
}

export const useSocket = () => useContext(SocketContext)
