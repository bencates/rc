import * as React from 'react'
import styled from 'styled-components'

import {useSocket} from './rc'

import Loading from './Loading'
import Header from './Header'

interface Props {
  userName: string,
  logOut: () => void
}

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
const Chat: React.FC<Props> = ({userName, logOut}) => {
  const {isConnected} = useSocket()

  return (
    <Window>
      {!isConnected && <Loading />}

      <HeaderArea>
        <Header userName={userName} logOut={logOut} />
      </HeaderArea>

      <RoomArea />

      <BodyArea />
    </Window>
  )
}

export default Chat
