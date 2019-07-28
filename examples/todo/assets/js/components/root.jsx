import * as React from 'react'
import TodoApp from './todo-app.jsx'
import { ChannelProvider } from '@rc/rc-react'

const opts = {}

const Root = () => (
  <ChannelProvider endPoint="ws://localhost:4000/socket" opts={opts}>
    <TodoApp />
  </ChannelProvider>
)

export default Root
