import * as React from 'react'
import styled from 'styled-components'
import {Normalize} from 'styled-normalize'

import {SOCKET_URL} from './config'
import {useSocket, withSocket} from './rc'

import Loading from './Loading'
import Header from './Header'

// TODO: real authentication
const socketConfig = {}

const Window = styled.div`
  display: grid;

  margin: 0;

  width: 100vw;
  height: 100vh;

  grid:
    [row1-start] "header header" 4em [row1-end]
    [row2-start] "rooms body" 1fr [row2-end]
    / 20% auto;
`

const HeaderArea = styled.div`
  grid-area: header;
  background-color: #2f9dd4;
`

const RoomArea = styled.div`
  grid-area: rooms;
  background-color: #f7b483;
`

const BodyArea = styled.div`
  grid-area: body;
  background-color: #EEE;
`

const App: React.FC = () => {
  const {isConnected} = useSocket()

  return (
    <Window>
      {!isConnected && <Loading />}
      <Normalize />

      <HeaderArea>
        <Header />
      </HeaderArea>

      <RoomArea />

      <BodyArea />
    </Window>
  )
}

export default withSocket(SOCKET_URL, socketConfig, App)
