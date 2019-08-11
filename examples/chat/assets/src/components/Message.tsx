import * as React from 'react'
import { Box, BoxProps, Text, Markdown } from 'grommet'
import TimeAgo from 'react-timeago'

import { MessageGroup } from '../channels/room'

interface OwnProps {
  messageGroup: MessageGroup
}

type Props = OwnProps & BoxProps

const Message: React.FC<Props> = ({ messageGroup, ...boxProps }) => (
  <Box as="article" border="top" {...boxProps}>
    <strong>{messageGroup.sender}:</strong>

    {messageGroup.messages.map(message => (
      <Box
        key={+message.sentAt}
        direction="row"
        margin={{ left: 'medium' }}
        align="baseline"
      >
        <Markdown>{message.text}</Markdown>

        <Text as="small" size="small" color="dark-6" margin={{ left: 'auto' }}>
          <TimeAgo date={message.sentAt} />
        </Text>
      </Box>
    ))}
  </Box>
)

export default Message
