// We need to import the CSS so that webpack will load it.
// The MiniCssExtractPlugin is used to separate it out into
// its own CSS file.
import css from 'todomvc-app-css/index.css'

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import createStore, { connectToSocket, joinChannel } from './store'

import { initialState as todosInitialState } from './channels/todos'

import TodoApp from './components/todo-app.jsx'

const store = createStore()
store.dispatch(connectToSocket('ws://localhost:4000/socket'))
store.dispatch(joinChannel('todos', todosInitialState))

const App = () => (
  <Provider store={store}>
    <TodoApp />
  </Provider>
)

// This code starts up the React app when it runs in a browser. It sets up the routing
// configuration and injects the app into a DOM element.
ReactDOM.render(<App />, document.getElementById('react-app'))
