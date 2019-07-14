import {useChannel} from '@rc/rc-react'

///////////////////
// Initial State //
///////////////////

const initialState = {todos: []}

/////////////
// Actions //
/////////////

export const createTodo = (title) => ({type:  'todos/CREATE', title})
export const changeTodoTitle = (id, title) => ({type: 'todos/CHANGE_TITLE', id, title})
export const toggleTodoComplete = (id) => ({type: 'todos/TOGGLE_COMPLETE', id})
export const toggleAllTodosComplete = () => ({type: 'todos/TOGGLE_ALL_COMPLETE'})
export const removeTodo = (id) => ({type: 'todos/REMOVE', id})
export const clearCompletedTodos = () => ({type: 'todos/CLEAR_COMPLETED'})

///////////////
// Selectors //
///////////////

export const getTodoCount = (state) => state.todos.length

export const getTodos = (state) => state.todos

export const areAnyTodosComplete = (state) => state.todos.some(t => t.complete)

export const areAllTodosComplete = (state) => state.todos.every(t => t.complete)

//////////
// Hook //
//////////

export const useTodos = () => useChannel('todos', initialState)
