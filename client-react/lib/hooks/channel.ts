import { useContext, useEffect } from 'react'

import { ChannelReducer } from '../types'
import { ChannelContext } from '../ChannelProvider'

export function useChannel<State>(
  channelName: string | null,
  initialState: State,
): [State, ChannelReducer['dispatch']] {
  const { getChannel, joinChannel, leaveChannel } = useContext(ChannelContext)

  useEffect(() => {
    if (channelName != null) {
      joinChannel(channelName)
      return () => leaveChannel(channelName)
    }
    return () => {}
  }, [channelName, joinChannel, leaveChannel])

  if (channelName == null) {
    return [
      initialState,
      () => {
        throw new Error('no channel set')
      },
    ]
  }

  const channel = getChannel(channelName, initialState)

  return [channel.state, channel.dispatch]
}
