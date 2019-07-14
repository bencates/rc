import * as React from 'react'
import {Normalize} from 'styled-normalize'

import {SOCKET_URL} from '../config'
import {ChannelProvider} from '@rc/rc-react'

import Chat from './Chat'
import LogIn from './LogIn'

const LOCAL_STORAGE_KEY = 'chat:username'

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = React.useState<null | string>(
    localStorage.getItem(LOCAL_STORAGE_KEY)
  )

  React.useEffect(() => {
    if (currentUser) {
      localStorage.setItem(LOCAL_STORAGE_KEY, currentUser)
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY)
    }
  }, [currentUser])

  const socketOpts = {params: {userName: currentUser}}

  return (
    <>
      <Normalize />
      {currentUser ? (
        <ChannelProvider endPoint={SOCKET_URL} opts={socketOpts}>
          <Chat userName={currentUser} logOut={() => setCurrentUser(null)} />
        </ChannelProvider>
      ) : (
        <LogIn {...{setCurrentUser}} />
      )}
    </>
  )
}

export default App
