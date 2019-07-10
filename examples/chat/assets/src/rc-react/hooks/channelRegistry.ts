import {MutableRefObject, useCallback, useEffect, useRef, useReducer} from 'react'
import {Socket} from 'phoenix'

import Channel from '../../rc/channel'

import {ChannelBox, GetChannel, JoinChannel, LeaveChannel} from '../types'

type ChannelList = Record<string, ChannelBox<any>>

enum Action {
  Add = 'ADD',
  Join = 'JOIN',
  Leave = 'LEAVE',
  Remove = 'REMOVE',
  Reset = 'RESET',
  SetState = 'SET_STATE'
}

type ReducerAction =
  {type: Action.Add; channelName: string; channelBox: Omit<ChannelBox<any>, 'refCount'>} |
  {type: Action.Join; channelName: string} |
  {type: Action.Leave; channelName: string} |
  {type: Action.Remove; channelName: string} |
  {type: Action.Reset} |
  {type: Action.SetState; channelName: string; state: object}

export const useChannelRegistry = (socket: MutableRefObject<Socket>) => {
  const prevSocket = useRef(socket.current)

  useEffect(() => {
    if (prevSocket.current !== socket.current) {
      dispatch({type: Action.Reset})
      prevSocket.current = socket.current
    }
  })

  const [channels, dispatch] = useReducer(
    (channels: ChannelList, action: ReducerAction): ChannelList => {
      if (action.type === Action.Reset) {
        console.log(`Resetting channel registry`)

        return Object.entries(channels).reduce((channels, [channelName, channelBox]) => {
          console.log(`Regenerating channel ${channelName}`)
          const channel = new Channel(socket.current, channelName, channelBox.initialState)

          channel.onState((state: object) => {
            dispatch({type: Action.SetState, channelName, state})
          })

          if (channelBox.refCount > 0) {
            console.log(`Connecting to channel "${channelName}"`)

            channelBox.channel.leave()
            channel.join()
          }

          return {channels, [channelName]: {
            ...channelBox,
            channel,
            state: channelBox.initialState,
            dispatch: channel.dispatch.bind(channel)
          }}
        }, {})
      }

      const channelName = action.channelName
      const channelBox = channels[action.channelName]

      switch (action.type) {
        case Action.Add:
          console.log(`Adding channel ${channelName}`)

          return {...channels, [channelName]: {...action.channelBox, refCount: 0}}

        case Action.Join:
          if (channelBox) {
            console.log(`Joining channel "${channelName}" (${channelBox.refCount + 1})`)

            if (channelBox.refCount === 0) {
              console.log(`Connecting to channel "${channelName}"`)

              channelBox.channel.join()
            }

            return {...channels, [channelName]: {...channelBox, refCount: channelBox.refCount + 1}}
          } else {
            return channels
          }

        case Action.Leave:
          if (channelBox) {
            console.log(`Leaving channel "${channelName}" (${channelBox.refCount - 1})`)

            if (channelBox.refCount === 1) {
              console.log(`Disconnecting from channel "${channelName}"`)

              channelBox.channel.leave()
            }

            return {...channels, [channelName]: {...channelBox, refCount: channelBox.refCount - 1}}
          } else {
            return channels
          }

        case Action.Remove: {
          console.log(`Removing channel "${channelName}"`)

          const {[channelName]: omitted, ...newState} = channels
          return newState
        }

        case Action.SetState:
          return {...channels, [channelName]: {...channelBox, state: action.state}}
      }
    },
    {}
  )

  return {
    getChannel: useCallback<GetChannel>(
      <State extends {}>(channelName: string, initialState: State) => {
        if (channelName in channels) {
          return channels[channelName] as ChannelBox<State>
        } else {
          const channel = new Channel(socket.current, channelName, initialState)

          channel.onState((state: object) => {
            dispatch({type: Action.SetState, channelName, state})
          })

          const serverDispatch = channel.dispatch.bind(channel)

          const channelBox = {channel, initialState, state: initialState, dispatch: serverDispatch, refCount: 0}

          dispatch({type: Action.Add, channelName, channelBox})

          return channelBox
        }
      },
      [socket, channels]
    ),

    joinChannel: useCallback<JoinChannel>((channelName: string) => {
      dispatch({type: Action.Join, channelName})
    }, []),

    leaveChannel: useCallback<LeaveChannel>((channelName: string) => {
      dispatch({type: Action.Leave, channelName})
    }, []),

    reset: useCallback(() => dispatch({type: Action.Reset}), [])
  }
}
