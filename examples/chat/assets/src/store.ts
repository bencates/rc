import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createReducerChannelSlice from 'redux-reducer-channel'

const {
  reducer: reducerChannelReducer,
  actions: reducerChannelActions,
  selectors: reducerChannelSelectors,
  middleware: reducerChannelMiddleware,
} = createReducerChannelSlice('phoenix')

export const {
  connectToSocket,
  disconnectFromSocket,
  joinChannel,
  leaveChannel,
} = reducerChannelActions
export const { isConnected, getChannelState } = reducerChannelSelectors

export default () => {
  const middleware = applyMiddleware(reducerChannelMiddleware)

  const enhancers = composeWithDevTools(middleware)

  const reducer = combineReducers({ phoenix: reducerChannelReducer })

  const store = createStore(reducer, enhancers)

  return store
}
