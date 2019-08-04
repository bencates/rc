import { createAction, createSelector } from 'redux-starter-kit'
import phoenixSlice from '../store/phoenix'

///////////////////
// Initial State //
///////////////////

export const initialState = { todos: [] }

/////////////
// Actions //
/////////////

export const createTodo = createAction('todos/CREATE', title => ({
  payload: { title },
  meta: { phoenixChannel: 'todos' },
}))

export const changeTodoTitle = createAction(
  'todos/CHANGE_TITLE',
  (id, title) => ({
    payload: { id, title },
    meta: { phoenixChannel: 'todos' },
  }),
)

export const toggleTodoComplete = createAction('todos/TOGGLE_COMPLETE', id => ({
  payload: { id },
  meta: { phoenixChannel: 'todos' },
}))

export const toggleAllTodosComplete = createAction(
  'todos/TOGGLE_ALL_COMPLETE',
  () => ({ payload: {}, meta: { phoenixChannel: 'todos' } }),
)

export const removeTodo = createAction('todos/REMOVE', id => ({
  payload: { id },
  meta: { phoenixChannel: 'todos' },
}))

export const clearCompletedTodos = createAction(
  'todos/CLEAR_COMPLETED',
  () => ({ payload: {}, meta: { phoenixChannel: 'todos' } }),
)

///////////////
// Selectors //
///////////////

export const getTodos = createSelector(
  [phoenixSlice.selectors.getState],
  ({ channels }) => channels.todos.state.todos,
)

export const getTodoCount = createSelector(
  [getTodos],
  todos => todos.length,
)

export const areAnyTodosComplete = createSelector(
  [getTodos],
  todos => todos.some(t => t.complete),
)

export const areAllTodosComplete = createSelector(
  [getTodos],
  todos => todos.every(t => t.complete),
)
