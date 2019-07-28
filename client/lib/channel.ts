import * as Phoenix from 'phoenix'

export interface Action<T = void> {
  type: string
  [payload: string]: any
}

export interface Callback<State> {
  (state: State, prevState: State): void
}

export default class Channel<State> {
  private channel: Phoenix.Channel
  private _state: State
  private callbacks: Callback<State>[] = []

  constructor(socket: Phoenix.Socket, name: string, initialState: State) {
    this.channel = socket.channel(name)
    this._state = initialState

    this.channel.on('set_state', (state: State) => this.setState(state))
  }

  join() {
    this.channel
      .join()
      .receive('ok', state => this.setState(state))
      // TODO: real timeout handling
      .receive('timeout', () =>
        console.log('Networking issue. Still waiting...'),
      )
  }

  leave() {
    this.channel.leave()
  }

  async dispatch<T>(action: Action<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.channel
        .push('dispatch', action)
        .receive('ok', (response: T) => resolve(response))
        // FIXME: receive "error"
        // FIXME: real timeout
        .receive('timeout', () => reject(new Error('timeout')))
    })
  }

  onState(callback: Callback<State>) {
    this.callbacks.push(callback)
  }

  offState(callback: Callback<State>) {
    const idx = this.callbacks.indexOf(callback)

    if (idx !== -1) {
      this.callbacks.splice(idx, 1)
    }
  }

  get state() {
    return { ...this._state }
  }

  // TODO: patchState
  private setState(state: State) {
    const prevState = this._state
    this._state = state

    this.callbacks.forEach(callback => callback(state, prevState))
  }
}
