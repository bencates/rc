import { Action as ReduxAction } from 'redux'
import { SocketConnectOption } from 'phoenix'

interface ConnectToSocketAction extends ReduxAction {
  payload: {
    endPoint: string
    opts: Partial<SocketConnectOption>
  }
}
interface SocketConnectedAction extends ReduxAction {
  payload: {}
}
interface SocketDisconnectedAction extends ReduxAction {
  payload: {}
}
interface DisconnectFromSocketAction extends ReduxAction {
  payload: {}
}
interface JoinChannelAction extends ReduxAction {
  payload: { channelName: string }
}
interface LeaveChannelAction extends ReduxAction {
  payload: { channelName: string }
}
interface SetStateAction extends ReduxAction {
  payload: { channelName: string; state: unknown }
}
interface PatchStateAction extends ReduxAction {
  payload: { channelName: string; patch: object[] }
}

export type ActionType =
  | ConnectToSocketAction
  | SocketConnectedAction
  | SocketDisconnectedAction
  | DisconnectFromSocketAction
  | JoinChannelAction
  | LeaveChannelAction
  | SetStateAction
  | PatchStateAction

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface ActionCreator<Action extends ActionType, Args extends any[] = []> {
  (...a: Args): Action
  type: string
  isAction: (action: ActionType) => action is Action
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createAction<Action extends ActionType, Args extends any[]>(
  actionType: string,
  createPayload: (...args: Args) => Action['payload'] = () => ({}),
): ActionCreator<Action, Args> {
  const actionCreator = (...args: Args): Action => {
    const payload: Action['payload'] = createPayload(...args)
    return { type: actionType, payload } as Action
  }

  actionCreator.type = actionType
  actionCreator.isAction = (action: ActionType): action is Action =>
    action.type === actionType

  return actionCreator
}

export interface Actions {
  connectToSocket: ActionCreator<
    ConnectToSocketAction,
    [string, Partial<SocketConnectOption>]
  >
  socketConnected: ActionCreator<SocketConnectedAction>
  socketDisconnected: ActionCreator<SocketDisconnectedAction>
  disconnectFromSocket: ActionCreator<DisconnectFromSocketAction>
  joinChannel: ActionCreator<JoinChannelAction, [string]>
  leaveChannel: ActionCreator<LeaveChannelAction, [string]>
  setState: ActionCreator<SetStateAction, [string, unknown]>
  patchState: ActionCreator<PatchStateAction, [string, object[]]>
}

export default function createActions(namespace: string | unknown): Actions {
  const createActionType = namespace
    ? (type: string) => `rc/${namespace}/${type}`
    : (type: string) => `rc/${type}/`

  return {
    connectToSocket: createAction(
      createActionType('CONNECT_TO_SOCKET'),
      (endPoint: string, opts: Partial<SocketConnectOption> = {}) => ({
        endPoint,
        opts,
      }),
    ),

    socketConnected: createAction(createActionType('SOCKET_CONNECTED')),

    socketDisconnected: createAction(createActionType('SOCKET_DISCONNECTED')),

    disconnectFromSocket: createAction(
      createActionType('DISCONNECT_FROM_SOCKET'),
    ),

    joinChannel: createAction(
      createActionType('JOIN_CHANNEL'),
      (channelName: string) => ({
        channelName,
      }),
    ),

    leaveChannel: createAction(
      createActionType('LEAVE_CHANNEL'),
      (channelName: string) => ({
        channelName,
      }),
    ),

    setState: createAction(
      createActionType('SET_STATE'),
      (channelName: string, state: unknown) => ({ channelName, state }),
    ),

    patchState: createAction(
      createActionType('PATCH_STATE'),
      (channelName: string, patch: object[]) => ({ channelName, patch }),
    ),
  }
}
