import { Middleware } from 'redux'
import { Socket, Channel } from 'phoenix'

import { Actions } from './actions'

export default (actions: Actions): Middleware => ({ dispatch }) => {
  let socket: Socket | null = null
  const channels: { [key: string]: Channel } = {}

  return next => async action => {
    if (actions.connectToSocket.isAction(action)) {
      const { endPoint, opts } = action.payload

      if (socket) {
        socket.disconnect()
      }

      socket = new Socket(endPoint, opts)

      socket.onOpen(() => dispatch(actions.socketConnected()))
      socket.onClose(() => dispatch(actions.socketDisconnected()))

      socket.connect()
    }

    if (actions.disconnectFromSocket.isAction(action)) {
      if (socket) {
        socket.disconnect()
      }

      socket = null
    }

    if (actions.joinChannel.isAction(action)) {
      const { channelName } = action.payload

      if (!socket) {
        throw new Error(`Must connect to a socket before joining channels`)
      }

      if (channels[channelName]) {
        throw new Error(`Channel "${channelName}" already exists`)
      }

      const channel = socket.channel(channelName)
      channels[channelName] = channel

      channel.on('patch_state', patch => {
        dispatch(actions.patchState(channelName, patch))
      })

      channel
        .join()
        .receive('ok', state => dispatch(actions.setState(channelName, state)))
        // TODO: real error handling
        // TODO: real timeout handling
        .receive('timeout', () =>
          console.log('Networking issue. Still waiting...'),
        )
    }

    if (actions.leaveChannel.isAction(action)) {
      const { channelName } = action.payload

      if (channels[channelName]) {
        const channel = channels[channelName]
        delete channels[channelName]

        channel.leave()
      }
    }

    if (action.meta && action.meta.phoenixChannel) {
      console.log('Processing server action', action)

      const promise = new Promise((resolve, reject) => {
        const channel = channels[action.meta.phoenixChannel]

        if (!channel) {
          return reject(new Error('no such channel'))
        }

        channel
          .push('dispatch', action)
          .receive('ok', resolve)
          // TODO: real error handling
          .receive('error', reject)
          // TODO: real timeout handling
          .receive('timeout', () => reject(new Error('timeout')))
      })

      next(action)

      return promise
    }

    return next(action)
  }
}
