import {useContext, useEffect} from 'react'

import {ChannelReducer} from '../types'
import {ChannelContext} from '../ChannelProvider'

export function useChannel<State>(channelName: string, initialState: State): [State, ChannelReducer['dispatch']] {
  const {
    getChannel,
    joinChannel,
    leaveChannel
  } = useContext(ChannelContext)

  const channel = getChannel(channelName, initialState)

  useEffect(() => {
    joinChannel(channelName)
    return () => leaveChannel(channelName)
  }, [channelName, joinChannel, leaveChannel])

  return [channel.state, channel.dispatch]
}
