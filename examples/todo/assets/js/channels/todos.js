import { createChannelAction } from 'redux-reducer-channel'

import { getChannelState } from '../store'

///////////////////
// Initial State //
///////////////////

const initialState = { todos: [] }

/////////////
// Actions //
/////////////

export const createTodo = createChannelAction(
  'todos/CREATE',
  'todos',
  title => ({ title }),
)

export const changeTodoTitle = createChannelAction(
  'todos/CHANGE_TITLE',
  'todos',
  (id, title) => ({ id, title }),
)

export const toggleTodoComplete = createChannelAction(
  'todos/TOGGLE_COMPLETE',
  'todos',
  id => ({ id }),
)

export const toggleAllTodosComplete = createChannelAction(
  'todos/TOGGLE_ALL_COMPLETE',
  'todos',
)

export const removeTodo = createChannelAction('todos/REMOVE', 'todos', id => ({
  id,
}))

export const clearCompletedTodos = createChannelAction(
  'todos/CLEAR_COMPLETED',
  'todos',
)

///////////////
// Selectors //
///////////////

const getState = getChannelState('todos', initialState)

export const getTodos = state => getState(state).todos

export const getTodoCount = state => getTodos(state).length

export const areAnyTodosComplete = state =>
  getTodos(state).some(t => t.complete)

export const areAllTodosComplete = state =>
  getTodos(state).every(t => t.complete)
