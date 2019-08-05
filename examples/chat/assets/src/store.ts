import { configureStore, getDefaultMiddleware } from 'redux-starter-kit'
import { SocketConnectOption } from 'phoenix'

import { createPhoenixSlice } from './redux-phoenix'

export const {
  reducer: phoenixReducer,
  actions: phoenixActions,
  selectors: phoenixSelectors,
  middleware: phoenixMiddleware,
} = createPhoenixSlice('phoenix')

export const connectToSocket = (
  endPoint: string,
  opts: Partial<SocketConnectOption> = {},
) => phoenixActions.connectToSocket({ endPoint, opts })

export const disconnectFromSocket = () => phoenixActions.disconnectFromSocket()

export const joinChannel = (channelName: string, initialState: any = {}) =>
  phoenixActions.joinChannel({ channelName, initialState })

export const leaveChannel = (channelName: string) =>
  phoenixActions.leaveChannel({ channelName })

export default () =>
  configureStore({
    reducer: { phoenix: phoenixReducer },
    middleware: [...getDefaultMiddleware(), phoenixMiddleware],
  })
