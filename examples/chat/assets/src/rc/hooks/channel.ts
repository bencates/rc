import {useContext, useEffect} from 'react'

import {ChannelContext} from '../ChannelProvider'

export function useChannel<S, T>(channelName: string, initialState: T) {
  const {
    getChannel,
    joinChannel,
    leaveChannel
  } = useContext(ChannelContext)

  const channel = getChannel<T>(channelName, initialState)

  useEffect(() => {
    joinChannel(channelName)
    return () => leaveChannel(channelName)
  }, [channelName, joinChannel, leaveChannel])

  return [channel.state, channel.dispatch]
}
