import {createContext, createElement, useContext, useReducer} from 'react'
import {reducers} from '../actions/todos'

export const initialState = {
  todos: [
    {id: 1, title: 'Taste Javascript', complete: true},
    {id: 2, title: 'Buy a Unicorn', complete: false}
  ],
  nextTodoId: 3
}

export const reducer = (state, action) => {
  if (action.type in reducers) {
    return reducers[action.type](state, action)
  } else {
    throw new Error(`Unknown action ${action.type}`)
  }
}

export const useTodos = () => useReducer(reducer, initialState)

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
