import * as React from 'react'
import { Box, Grid, Heading, Button } from 'grommet'
import { Logout } from 'grommet-icons'

import Loading from './Loading'
import RoomList from './RoomList'
import ChatRoom from './ChatRoom'
import { NO_SUCH_ROOM } from '../channels/room'

interface Props {
  userName: string
  logOut: () => void
}

interface State {
  currentRoom: string | null
}

export default class Chat extends React.Component<Props, State> {
  state = { currentRoom: null }

  render() {
    const { userName, logOut } = this.props
    const { currentRoom } = this.state

    return (
      <Grid
        fill
        rows={['4rem', '1fr']}
        columns={['20%', 'auto']}
        areas={[
          { name: 'header', start: [0, 0], end: [1, 0] },
          { name: 'rooms', start: [0, 1], end: [0, 1] },
          { name: 'body', start: [1, 1], end: [1, 1] },
        ]}
      >
        <Loading />

        <Box
          as="header"
          gridArea="header"
          direction="row"
          background="brand"
          align="center"
          justify="between"
          pad="small"
        >
          <Heading size="small">@{userName}</Heading>
          <Button
            plain
            a11yTitle="Log Out"
            icon={<Logout />}
            onClick={logOut}
          />
        </Box>

        <RoomList
          as="nav"
          gridArea="rooms"
          currentRoom={currentRoom}
          setRoom={room => this.setState({ currentRoom: room })}
        />

        <ChatRoom as="main" gridArea="body" room={currentRoom} />
      </Grid>
    )
  }
}
