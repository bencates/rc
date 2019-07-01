import {createContext, createElement, useContext, useReducer} from 'react'
import {reducers} from '../actions/todos'

export const initialState = {todos: [], nextTodoId: 1}

export const reducer = (state, action) => {
  if (action.type in reducers) {
    return reducers[action.type](state, action)
  } else {
    throw new Error(`Unknown action ${action.type}`)
  }
}

export const useTodos = () => {
  const [state, localDispatch] = useReducer(reducer, initialState)

  const dispatch = (action) => Promise.resolve(localDispatch(action))

  return [state, dispatch]
}

/////////////
// Context //
/////////////

const StateContext = createContext()
const DispatchContext = createContext()

export const TodosProvider = ({value: [state, dispatch], children}) => (
  createElement(
    StateContext.Provider,
    {value: state},
    createElement(
      DispatchContext.Provider,
      {value: dispatch},
      children
    )
  )
)

export const useDispatch = () => useContext(DispatchContext)

export const useSelector = (selector) => {
  const state = useContext(StateContext)

  return selector(state)
}
