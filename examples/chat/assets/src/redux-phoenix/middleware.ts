import { Middleware } from 'redux'
import { Socket, Channel } from 'phoenix'

export default (actions: any): Middleware => ({ dispatch }) => {
  let socket: Socket | null = null
  const channels: { [key: string]: Channel } = {}
  ;(window as any).channels = channels

  return next => async action => {
    if (action.type === actions.connectToSocket.type) {
      const { endPoint, opts } = action.payload

      if (socket) {
        socket.disconnect()
      }

      socket = new Socket(endPoint, opts)

      socket.onOpen(() => dispatch(actions.socketConnected()))
      socket.onClose(() => dispatch(actions.socketDisconnected()))

      socket.connect()
    }

    if (action.type === actions.disconnectFromSocket.type) {
      if (socket) {
        socket.disconnect()
      }

      socket = null
    }

    if (action.type === actions.joinChannel.type) {
      const { channelName } = action.payload

      if (!socket) {
        throw new Error(`Must connect to a socket before joining channels`)
      }

      if (channels[channelName]) {
        throw new Error(`Channel "${channelName}" already exists`)
      }

      const channel = socket.channel(channelName)
      channels[channelName] = channel

      channel.on('set_state', state => {
        dispatch(actions.setState({ channelName, state }))
      })

      channel
        .join()
        .receive('ok', state =>
          dispatch(actions.setState({ channelName, state })),
        )
        // TODO: real error handling
        // TODO: real timeout handling
        .receive('timeout', () =>
          console.log('Networking issue. Still waiting...'),
        )
    }

    if (action.type === actions.leaveChannel.type) {
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
