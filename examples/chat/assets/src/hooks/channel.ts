import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { isConnected, joinChannel, leaveChannel } from '../store'

export default (channelName: string | null | false | undefined) => {
  const dispatch = useDispatch()
  const socketConnected = useSelector(isConnected)

  useEffect(() => {
    if (channelName && socketConnected) {
      dispatch(joinChannel(channelName))
      return () => {
        dispatch(leaveChannel(channelName))
      }
    }
    return () => {}
  }, [channelName, dispatch, socketConnected])
}
