import {Channel} from 'phoenix'

export interface ServerAction <T = void> {
  type: string
  [payload: string]: any
}

export type Dispatch = <T>(action: ServerAction<T>) => Promise<T>

export interface ChannelBox<State = {}> {
  channel: Channel
  state: State
  dispatch: Dispatch
  refCount: number
}

export type GetChannel = <State extends {}>(channelName: string, initialState: State) => ChannelBox<State>
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
