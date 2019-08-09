import * as React from 'react'
import { Box, BoxProps } from 'grommet'

import { State } from '../channels/room'

interface OwnProps {
  message: State['messages'][0]
}

type Props = OwnProps & BoxProps

const Message: React.FC<Props> = ({ message, ...boxProps }) => (
  <Box as="article" {...boxProps}>
    <pre>
      <code>{JSON.stringify(message, null, '  ')}</code>
    </pre>
  </Box>
)

export default Message
