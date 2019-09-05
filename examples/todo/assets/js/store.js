import { createStore, applyMiddleware } from 'redux'
import createReducerChannelSlice from 'redux-reducer-channel'
import { composeWithDevTools } from 'redux-devtools-extension'

const {
  reducer: rcReducer,
  actions: rcActions,
  middleware: rcMiddleware,
  selectors: rcSelectors,
} = createReducerChannelSlice()

export const { connectToSocket, joinChannel, leaveChannel } = rcActions
export const { getChannelState } = rcSelectors

export default () =>
  createStore(rcReducer, composeWithDevTools(applyMiddleware(rcMiddleware)))
