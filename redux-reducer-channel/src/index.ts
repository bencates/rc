import { Action as ReduxAction } from 'redux'

import createActions, { Actions } from './actions'
import createReducer, { State } from './reducer'
import createSelectors, { Selectors } from './selectors'
import createMiddleware from './middleware'

export interface Slice {
  actions: Actions
  middleware: ReturnType<typeof createMiddleware>
  reducer: ReturnType<typeof createReducer>
  selectors: Selectors
}

/**
 * Creates Aa reducer, middleware, selectors, and actions to manage a
 * collection of channels.
 *
 * @param sliceNamespace
 *
 * An optional namespace for the slice.
 *
 * Without a namespace the reducer **must** be the root reducer for the store,
 * otherwise the reducer **must** be configured as by Redux's `combineReducers`
 * method, where the namespace matches the object key the reducer is attached
 * to.
 */
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
  toString: () => string
  isAction: (action: ReduxAction) => action is ChannelAction<Payload>
}

/**
 * Creates an action creator for channel actions.
 *
 * Channel actions are normal Redux actions with a `meta.phoenixChannel`
 * property. When dispatched, a channel action will be broadcast to the server
 * over the specified channel, as well as being sent to the Redux client-side
 * reducers.
 *
 * As a developer affordance, channel action creators provide their action type
 * as both a custom `toString()` method and a `type` property. They also have
 * an `isAction(action)` Typescript typeguard method to facilitate type safe
 * access to the payload.
 */
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
