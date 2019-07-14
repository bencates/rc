import * as React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  background: #e09ee6;

  display: flex;
  justify-content: center;
  align-items: center;
`

interface Props {
  setCurrentUser: (currentUser: string) => void
}

const LogIn: React.FC<Props> = ({setCurrentUser}) => {
  const [inputValue, setInputValue] = React.useState('')

  return (
    <Container>
      <form onSubmit={() => {
        setCurrentUser(inputValue)
        setInputValue('')
      }}>
        <label>
          <p>Login</p>
          <p>
            <input
              type="text"
              placeholder="Username"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </p>
        </label>
      </form>
    </Container>
  )
}

export default LogIn
