import * as React from 'react'
import styled from 'styled-components'

interface Props {
  userName: string
  logOut: () => void
}

const OuterContainer = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
`

const InnerContainer = styled.div`
  display: flex;
  align-items: center;
`

const Left = styled(InnerContainer)`
  justify-content: flex-start;
`

const Right = styled(InnerContainer)`
  justify-content: flex-end;
`
const Header: React.FC<Props> = ({ userName, logOut }) => {
  return (
    <OuterContainer>
      <Left>
        <h1>@{userName}</h1>
      </Left>
      <Right>
        <button onClick={logOut}>Log Out</button>
      </Right>
    </OuterContainer>
  )
}

export default Header
