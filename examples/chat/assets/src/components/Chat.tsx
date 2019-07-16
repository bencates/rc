import * as React from 'react'
import { Box, Grid, Heading, Button } from 'grommet'
import { Logout } from 'grommet-icons'

import Loading from './Loading'
import RoomList from './RoomList'

interface Props {
  userName: string
  logOut: () => void
}

const Chat: React.FC<Props> = ({ userName, logOut }) => (
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
      <Button plain a11yTitle="Log Out" icon={<Logout />} onClick={logOut} />
    </Box>

    <RoomList gridArea="rooms" />

    <Box as="main" gridArea="body" />
  </Grid>
)

export default Chat
