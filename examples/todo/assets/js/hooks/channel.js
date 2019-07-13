import {useState} from 'react'
import { Socket } from 'phoenix'
import { camelizeKeys } from 'humps'

export class TimeoutError extends Error {}

export const useSocket = () => {
  const [cachedSocket, setSocket] = useState(null)

  if (cachedSocket) {
    return cachedSocket
  }

  // TODO: real server URL
  // TODO: real authentication
  const socket = new Socket('ws://localhost:4000/socket')

  socket.connect()

  setSocket(socket)

  return socket
}

// const patchState = (state, patch) => {
//   const deepPatch = (state, patch, key) => {
//     switch (patch.changed) {
//       case 'added':
//         state[key] = patch.value
//         return state

//       case 'removed':
//         delete(state[key])
//         return state

//       case 'primitive_change':
//         return patch.value

//       case 'map_change':
//         Object.keys(patch.value).forEach(key => {
//           state[key] = deepPatch(state[key], patch.value[key], key)
//         })
//         return state
//     }
//   }

//   return deepPatch(state, patch, null)
// }

export const useChannel = (socket, channelName, initialState = {}) => {
  const [state, setState] = useState(initialState)

  const [channel] = useState(() => {
    const channel = socket.channel(channelName)

    channel.on('set_state', newState => {
      setState(newState)
    })

    // channel.onError(() => store.commit('socketDisconnect'))

    channel.join()
      .receive('ok', serverState => setState(camelizeKeys(serverState)))
      // TODO: real timeout handling
      // .receive('timeout', () => console.log('Networking issue. Still waiting...'))

    return channel
  })

  const [dispatch] = useState(() => {
    return async (action) => new Promise((resolve, reject) => {
      channel.push('dispatch', action)
        .receive('ok', response => resolve(camelizeKeys(response)))
        // FIXME: receive "error"
        .receive('timeout', () => reject(new TimeoutError('timeout')))
    })
  })

  return [state, dispatch]
}

// export function state () {
//   return {
//     $socketConnected: false,
//     $room: false,
//   }
// }

// export const mutations = {
//   socketConnect: state => state.$socketConnected = true,
//   socketDisconnect: state => state.$socketConnected = false,

//   setRoom (state, { room }) {
//     state.$room = room;
//   },
// }
