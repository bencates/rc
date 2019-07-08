// import {useState} from 'react'
// import { camelizeKeys } from 'humps'

// export class TimeoutError extends Error {}

export {default as ChannelProvider} from './ChannelProvider'
export {useConnectionStatus} from './hooks/connectionStatus'

// // const patchState = (state, patch) => {
// //   const deepPatch = (state, patch, key) => {
// //     switch (patch.changed) {
// //       case 'added':
// //         state[key] = patch.value
// //         return state

// //       case 'removed':
// //         delete(state[key])
// //         return state

// //       case 'primitive_change':
// //         return patch.value

// //       case 'map_change':
// //         Object.keys(patch.value).forEach(key => {
// //           state[key] = deepPatch(state[key], patch.value[key], key)
// //         })
// //         return state
// //     }
// //   }

// //   return deepPatch(state, patch, null)
// // }

//   const [dispatch] = useState(() => {
//     return async (action) => new Promise((resolve, reject) => {
//       channel.push('dispatch', action)
//         .receive('ok', response => resolve(camelizeKeys(response)))
//         // FIXME: receive "error"
//         .receive('timeout', () => reject(new TimeoutError('timeout')))
//     })
//   })

//   return [state, dispatch]
// }

// // export function state () {
// //   return {
// //     $socketConnected: false,
// //     $room: false,
// //   }
// // }

// // export const mutations = {
// //   socketConnect: state => state.$socketConnected = true,
// //   socketDisconnect: state => state.$socketConnected = false,

// //   setRoom (state, { room }) {
// //     state.$room = room;
// //   },
// // }
