import {useContext} from 'react'

import {SocketContext} from '../SocketProvider'

export const useConnectionStatus = () => useContext(SocketContext).isConnected
