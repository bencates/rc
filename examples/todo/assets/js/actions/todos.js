import {areAllTodosComplete} from '../selectors/todos'

const CREATE = 'todos/CREATE'
const CHANGE_TITLE = 'todos/CHANGE_TITLE'
const TOGGLE_COMPLETE = 'todos/TOGGLE_COMPLETE'
const TOGGLE_ALL_COMPLETE = 'todos/TOGGLE_ALL_COMPLETE'
const REMOVE = 'todos/REMOVE'
const CLEAR_COMPLETED = 'todos/CLEAR_COMPLETED'

export const createTodo = (title) => ({type: CREATE, title})
export const changeTodoTitle = (id, title) => ({type: CHANGE_TITLE, id, title})
export const toggleTodoComplete = (id) => ({type: TOGGLE_COMPLETE, id})
export const toggleAllTodosComplete = () => ({type: TOGGLE_ALL_COMPLETE})
export const removeTodo = (id) => ({type: REMOVE, id})
export const clearCompletedTodos = (id) => ({type: CLEAR_COMPLETED})

export const reducers = {
  [CREATE]: (state, {title}) => {
    const todos = state.todos.slice(0)

    todos.push({id: state.nextTodoId, title, complete: false})

    return {...state, todos, nextTodoId: state.nextTodoId + 1}
  },

  [CHANGE_TITLE]: (state, {id, title}) => {
    const todoIndex = state.todos.findIndex(t => t.id === id)

    if (todoIndex === -1) return state

    const todo = state.todos[todoIndex]
    const todos = state.todos.slice(0)
    todos[todoIndex] = {...todo, title}

    return {...state, todos}
  },

  [TOGGLE_COMPLETE]: (state, {id}) => {
    const todoIndex = state.todos.findIndex(t => t.id === id)

    if (todoIndex === -1) return state

    const todo = state.todos[todoIndex]
    const todos = state.todos.slice(0)
    todos[todoIndex] = {...todo, complete: !todo.complete}

    return {...state, todos}
  },

  [TOGGLE_ALL_COMPLETE]: (state) => {
    const complete = !areAllTodosComplete(state)

    const todos = state.todos.map((todo) => ({...todo, complete}))

    return {...state, todos}
  },

  [REMOVE]: (state, {id}) => {
    const todoIndex = state.todos.findIndex(t => t.id === id)

    if (todoIndex === -1) return state

    const todos = state.todos.slice(0)
    todos.splice(todoIndex, 1)

    return {...state, todos}
  },

  [CLEAR_COMPLETED]: (state) => {
    const todos = state.todos.filter(t => !t.complete)

    return {...state, todos}
  }
}

