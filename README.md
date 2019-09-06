# RC

Redux reducers over Phoenix channels

## Server

[`phoenix_reducer_channel`](https://hex.pm/packages/phoenix_reducer_channel)

## Client

[`redux-reducer-channel`](https://www.npmjs.com/package/redux-reducer-channel)

### Installation

```shell
npm install --save redux-reducer-channel
# or
yarn add redux-reducer-channel
```

### Setup

```js
import { applyMiddleware, combineReducers, createStore } from 'redux'
import createReducerChannelSlice from 'redux-reducer-channel'

const {
  reducer: rcReducer,
  actions: rcActions,
  selectors: rcSelectors,
  middleware: rcMiddleware,
} = createReducerChannelSlice('phoenix')

export const { connectToSocket, disconnectFromSocket, joinChannel, leaveChannel } = rcActions
export const { isConnected, getChannelState } = rcSelectors

export default () => createStore(
  combineReducers({ phoenix: rcReducer }),
  applyMiddleware(rcMiddleware)
)
```

#### Actions

##### `connectToSocket(endPoint, opts)`

Initiates a Phoenix socket connection. The options are passed on to
[Phoenix's `Socket` class creator](https://hexdocs.pm/phoenix/js/index.html#socket).
 
##### `disconnectFromSocket()`

Closes the existing socket connection.

##### `socketConnected()`

Dispatched automatically by the middleware when the socket connects.

##### `socketDisconnected()`

Dispatched automatically by the middleware when the socket connection is
lost.

##### `joinChannel(channelName)`

Joins a channel.

##### `leaveChannel()`

Leaves a channel.

##### `setState(channelName, state)`

Dispatched by the server when a channel is joined. This contains a
snapshot of the server state at the time of connection.

##### `patchState(channelName, patch)`

Dispatched by the server when the server state is updated. Contains a
[JSON Patch](http://jsonpatch.com/) to update the local channel state to
match the new server state.

#### Selectors

##### `hasSocket`

Checks whether a socket connection has been initialized.

##### `isConnected`

Checks whether the socket has a connection to the server.

##### `hasChannel(channelName)`

Checks whether a given channel has been joined.

##### `getChannelState(channelName, initialState)`

Retrieves the state for a given channel. If the channel hasn't been
joined or the server's state hasn't been retrieved yet it
returns the `initialState` instead.

#### Reducer

The reducer maintains a cache of any number of channel states. It
is predominantly managed by the middleware.

It's state should not be accessed directly, but instead through
the provided selectors.

#### Middleware

The middleware wraps a Phoenix socket connection and any number
of open channels and manages keeping the reducer updated as
server traffic arrives.

It also intercepts channel actions. A channel action is a normal
Redux action with a `meta.phoenixChannel` property. These actions
are dispatched to the server over channel specified by that property.
Channel actions are then passed on through the rest of the middleware
stack to the reducer.

When it has dispatched a channel action the middleware will return
a promise for the server's response. The promise will not resolve until
after any state updates caused by the dispatched action have been
synchronized to the reducer. Note, though, that it can reject with
either a server error or a timeout.

### `createChannelAction(actionType, channelName, payloadCreator)`

Creates an action creator for channel actions of type `actionType` which
will be dispatched to the specified `channelName`.

An optional `payloadCreator` can be provided, in which case the generated
action creator will take the same arguments as the `payloadCreator` and
use the `payloadCreator`'s return value as the payload of the created
action.

As a developer affordance, channel action creators provide their action type
as both a custom `toString()` method and a `type` property. They also have
an `isAction(action)` Typescript typeguard method to facilitate type safe
access to the payload.
