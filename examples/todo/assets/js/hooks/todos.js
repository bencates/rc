import {createContext, createElement, useContext} from 'react'

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
