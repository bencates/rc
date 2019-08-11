import * as React from 'react'
import { useSelector } from 'react-redux'
import { CSSTransition } from 'react-transition-group'

import styled, { keyframes } from 'styled-components'
import { Box } from 'grommet'
import { Update } from 'grommet-icons'
import { position } from 'polished'

import useTimeout from '../hooks/timeout'
import { phoenixSelectors } from '../store'

const animationDuration = 300

const LoadingNotice = styled(Box).attrs({ forwardedAs: 'aside' })`
  ${position('absolute', 0, null, null, '50%')}

  /* Slide in when newly rendered */
  transition: transform ${animationDuration}ms;

  &.enter { transform: translate(-50%, -100%) }
  &, &.enter-active { transform: translate(-50%, 0%) }
`

const spin = keyframes`
  from { transform: rotate(0deg) }
  to { transform: rotate(359deg) }
`

const UpdateSpinner = styled(Update)`
  animation: ${spin} 2s infinite linear;
`

const Loading: React.FC = () => {
  // Allow half a second to connect before showing the alert
  const timeoutExpired = useTimeout(500)

  const isConnected = useSelector(phoenixSelectors.getConnectionStatus)

  return (
    <CSSTransition
      in={timeoutExpired && !isConnected}
      timeout={animationDuration}
      mountOnEnter
      unmountOnExit
    >
      <LoadingNotice
        background={{ color: 'dark-1' }}
        pad="medium"
        direction="row"
        gap="small"
      >
        Connecting <UpdateSpinner />
      </LoadingNotice>
    </CSSTransition>
  )
}

export default Loading
