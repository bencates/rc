import * as React from 'react'
import { useDispatch } from 'react-redux'
import { Grommet } from 'grommet'

import { SOCKET_URL } from '../config'
import { connectToSocket, disconnectFromSocket } from '../store'

import Chat from './Chat'
import LogIn from './LogIn'

const theme = {
  global: {
    font: {
      family:
        'system-ui, -apple-system, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
    },
  },
}

const LOCAL_STORAGE_KEY = 'chat:username'

const App: React.FC = () => {
  const dispatch = useDispatch()

  const [currentUser, setCurrentUser] = React.useState<null | string>(
    localStorage.getItem(LOCAL_STORAGE_KEY),
  )

  React.useEffect(() => {
    if (currentUser) {
      localStorage.setItem(LOCAL_STORAGE_KEY, currentUser)
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY)
    }
  }, [currentUser])

  React.useEffect(() => {
    if (currentUser) {
      dispatch(
        connectToSocket(SOCKET_URL, { params: { userName: currentUser } }),
      )
      return () => dispatch(disconnectFromSocket())
    }
    return () => {}
  }, [dispatch, currentUser])

  return (
    <Grommet theme={theme} full>
      {currentUser ? (
        <Chat userName={currentUser} logOut={() => setCurrentUser(null)} />
      ) : (
        <LogIn {...{ setCurrentUser }} />
      )}
    </Grommet>
  )
}

export default App
