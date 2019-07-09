import {MutableRefObject, useCallback, useReducer} from 'react'
import {Channel, Socket} from 'phoenix'

import {ChannelBox, Dispatch, ServerAction, GetChannel, JoinChannel, LeaveChannel} from '../types'

type ChannelList = Record<string, ChannelBox>

enum Action {
  Add = 'ADD',
  Join = 'JOIN',
  Leave = 'LEAVE',
  Remove = 'REMOVE',
  SetState = 'SET_STATE'
}

type ReducerAction =
  { type: Action.Add; channelName: string; channel: Channel; dispatch: Dispatch, initialState?: object } |
  { type: Action.Join; channelName: string } |
  { type: Action.Leave; channelName: string } |
  { type: Action.Remove; channelName: string } |
  { type: Action.SetState; channelName: string; state: object }

export const useChannelRegistry = (socket: MutableRefObject<Socket>) => {
  const [channels, dispatch] = useReducer(
    (channels: ChannelList, action: ReducerAction): ChannelList => {
      const channelName = action.channelName
      const channelBox = channels[action.channelName]

      switch (action.type) {
        case Action.Add:
          action.channel.on('set_state', (state: object) => {
            dispatch({type: Action.SetState, channelName, state})
          })

          return {...channels, [channelName]: {
            channel: action.channel,
            state: action.initialState || {},
            dispatch: action.dispatch,
            refCount: 0
          }}

        case Action.Join:
          if (channelBox) {
            if (channelBox.refCount === 0) {
              channelBox.channel.join()
                .receive('ok', state => dispatch({type: Action.SetState, channelName, state}))
                // TODO: real timeout handling
                .receive('timeout', () => console.log('Networking issue. Still waiting...'))
            }

            return {...channels, [channelName]: {...channelBox, refCount: channelBox.refCount + 1}}
          } else {
            return channels
          }

        case Action.Leave:
          if (channelBox) {
            if (channelBox.refCount === 1) {
              channelBox.channel.leave()
            }

            return {...channels, [channelName]: {...channelBox, refCount: channelBox.refCount - 1}}
          } else {
            return channels
          }

        case Action.Remove: {
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
          const channel = socket.current.channel(channelName)

          const serverDispatch = async <T extends any>(serverAction: ServerAction<T>) =>
            new Promise<T>((resolve, reject) => {
              channel.push('dispatch', serverAction)
                .receive('ok', (response: T) => resolve(response))
                // FIXME: receive "error"
                // FIXME: real timeout
                .receive('timeout', () => reject(new Error('timeout')))
            })

          dispatch({type: Action.Add, channelName, channel, initialState, dispatch: serverDispatch})

          return {channel, state: initialState, dispatch: serverDispatch, refCount: 0}
        }
      },
      [socket, channels]
    ),

    joinChannel: useCallback<JoinChannel>((channelName: string) => {
      dispatch({type: Action.Join, channelName})
    }, []),

    leaveChannel: useCallback<LeaveChannel>((channelName: string) => {
      dispatch({type: Action.Leave, channelName})
    }, [])
  }
}
