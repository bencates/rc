import {Channel, Action} from '@rc/rc'

export type ServerAction = Action

export interface ChannelReducer<State = {}> {
  state: State
  dispatch: <T>(action: Action<T>) => Promise<T> // </T></T></T> // fix syntax highlighting
}

export interface ChannelBox<State = {}> extends ChannelReducer<State> {
  channel: Channel<State>
  initialState: State
  refCount: number
}

export type GetChannel = <State extends {}>(channelName: string, initialState: State) => ChannelReducer<State>
// </State></State> // fix syntax highlighting
export type JoinChannel = (channelName: string) => void
export type LeaveChannel = (channelName: string) => void

export interface ContextState {
  isConnected: boolean
  getChannel: GetChannel,
  joinChannel: JoinChannel,
  leaveChannel: LeaveChannel
}

export enum ErrorType {
  Timeout
}

export interface ServerError extends Error {
  code: ErrorType
}
