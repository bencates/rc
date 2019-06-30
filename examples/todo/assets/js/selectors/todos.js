export const getTodoCount = (state) => state.todos.length

export const getTodos = (state) => state.todos

export const areAnyTodosComplete = (state) => state.todos.some(t => t.complete)

export const areAllTodosComplete = (state) => state.todos.every(t => t.complete)
