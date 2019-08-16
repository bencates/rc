import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { phoenixActions, phoenixSelectors } from '../store'

const defaultInitialState = {}

export default (
  channelName: string | null | false | undefined,
  initialState: any = defaultInitialState,
) => {
  const dispatch = useDispatch()
  const socketConnected = useSelector(phoenixSelectors.getConnectionStatus)

  useEffect(() => {
    if (channelName && socketConnected) {
      dispatch(phoenixActions.joinChannel({ channelName, initialState }))
      return () => {
        dispatch(phoenixActions.leaveChannel({ channelName }))
      }
    }
    return () => {}
  }, [channelName, initialState, dispatch, socketConnected])
}
