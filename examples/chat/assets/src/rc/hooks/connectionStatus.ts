import {useContext} from 'react'

import {ChannelContext} from '../ChannelProvider'

export const useConnectionStatus = () => useContext(ChannelContext).isConnected
