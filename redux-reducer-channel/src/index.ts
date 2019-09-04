import { Action as ReduxAction } from 'redux'

import createActions from './actions'
import createReducer, { State } from './reducer'
import createSelectors from './selectors'
import createMiddleware from './middleware'

export interface Slice {
  actions: ReturnType<typeof createActions>
  middleware: ReturnType<typeof createMiddleware>
  reducer: ReturnType<typeof createReducer>
  selectors: ReturnType<typeof createSelectors>
}

export default function createSlice(
  sliceNamespace: string | undefined = undefined,
): Slice {
  const actions = createActions(sliceNamespace)

  const middleware = createMiddleware(actions)

  const reducer = createReducer(actions)

  const selectors = sliceNamespace
    ? createSelectors(
        (rootState: { [key: string]: State }) => rootState[sliceNamespace],
      )
    : createSelectors((state: State) => state)

  return { actions, middleware, reducer, selectors }
}

interface ChannelAction<P> extends ReduxAction<string> {
  payload: P
  meta: { phoenixChannel: string }
}

interface ChannelActionCreator<Payload, Args extends unknown[]> {
  (...a: Args): ChannelAction<Payload>
  type: string
}

export function createChannelAction<Payload = {}, Args extends unknown[] = []>(
  actionType: string,
  channel: string,
  createPayload: (...args: Args) => Payload = () => ({} as Payload),
): ChannelActionCreator<Payload, Args> {
  const actionCreator = (...args: Args): ChannelAction<Payload> => {
    const action: ChannelAction<Payload> = {
      type: actionType,
      payload: createPayload(...args),
      meta: { phoenixChannel: channel },
    }

    return action
  }

  actionCreator.type = actionType

  actionCreator.toString = () => `${actionType}`

  actionCreator.isAction = (
    action: ReduxAction,
  ): action is ChannelAction<Payload> => action.type === actionType

  return actionCreator
}
