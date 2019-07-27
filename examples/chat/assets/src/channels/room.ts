import { useChannel } from '@rc/rc-react'

///////////
// State //
///////////

export interface State {}

const initialState: State = {}

//////////
// Hook //
//////////

export const useRoom = (name: string | null) =>
  useChannel<State>(name ? `room:${name}` : null, initialState)

////////////
// Errors //
////////////

export const NO_SUCH_ROOM = 'NO_SUCH_ROOM'
