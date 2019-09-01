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
