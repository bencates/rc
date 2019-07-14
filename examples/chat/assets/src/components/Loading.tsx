import * as React from 'react'
import styled from 'styled-components'

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  background-color: #000;
  opacity: 0.4;
`

const LoadingContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;
`

const ReconnectingNotice = styled.div`
  background: #000;
  color: #fff;

  padding: 0.6em 0.8em;

  border-radius: 0.6em;
`

const Loading: React.FC = () => (
  <>
    <LoadingOverlay />
    <LoadingContainer>
      <ReconnectingNotice>Reconnecting to server</ReconnectingNotice>
    </LoadingContainer>
  </>
)

export default Loading
