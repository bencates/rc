import { createSlice } from 'redux-starter-kit'

export default createSlice({
  initialState: {
    socket: null,
    channels: {},
  },
  reducers: {
    connectToSocket(state, { payload: { endPoint, opts } }) {
      state.socket = { endPoint, opts, connected: false }
    },

    socketConnected(state) {
      state.socket.connected = true
    },
    socketDisconnected(state) {
      state.socket.connected = false
    },

    disconnectFromSocket(state) {
      state.socket = null
    },

    joinChannel(state, { payload: { channelName, initialState } }) {
      state.channels[channelName] = { state: initialState }
    },

    leaveChannel(state, { payload: { channelName } }) {
      delete state.channels[channelName]
    },

    setState(state, { payload: { channelName, state: serverState } }) {
      if (state.channels[channelName]) {
        state.channels[channelName].state = serverState
      }
    },
  },
})
