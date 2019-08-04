import { configureStore, getDefaultMiddleware } from 'redux-starter-kit'

import phoenixSlice from './phoenix'
import middleware from './middleware'

const { actions } = phoenixSlice

export const connectToSocket = (endPoint, opts = {}) =>
  actions.connectToSocket({ endPoint, opts })

export const joinChannel = (channelName, initialState = {}) =>
  actions.joinChannel({ channelName, initialState })

export const leaveChannel = channelName => actions.leaveChannel({ channelName })

export default () => {
  return configureStore({
    reducer: phoenixSlice.reducer,
    middleware: [...getDefaultMiddleware(), middleware],
  })
}
