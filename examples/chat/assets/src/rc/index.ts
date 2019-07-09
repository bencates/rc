export {default as ChannelProvider} from './ChannelProvider'
export {useConnectionStatus} from './hooks/connectionStatus'
export {useChannel} from './hooks/channel'

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
