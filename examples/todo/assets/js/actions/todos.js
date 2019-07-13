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
export const clearCompletedTodos = () => ({type: CLEAR_COMPLETED})

