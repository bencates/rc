import * as React from 'react'
import { Grommet } from 'grommet'

import { SOCKET_URL } from '../config'
import { ChannelProvider } from '@rc/rc-react'

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

  const socketOpts = { params: { userName: currentUser } }

  return (
    <Grommet theme={theme} full>
      {currentUser ? (
        <ChannelProvider endPoint={SOCKET_URL} opts={socketOpts}>
          <Chat userName={currentUser} logOut={() => setCurrentUser(null)} />
        </ChannelProvider>
      ) : (
        <LogIn {...{ setCurrentUser }} />
      )}
    </Grommet>
  )
}

export default App
