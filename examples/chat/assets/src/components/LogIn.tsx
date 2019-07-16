import * as React from 'react'
import { Box, Button, Form, FormField } from 'grommet'
import { Login as LoginIcon } from 'grommet-icons'

interface Props {
  setCurrentUser: (currentUser: string) => void
}

interface SubmitEvent extends React.FormEvent<HTMLFormElement> {
  value: {
    username: string
  }
}

const LogIn: React.FC<Props> = ({ setCurrentUser }) => {
  return (
    <Box
      fill
      direction="column"
      justify="center"
      align="center"
      background="brand"
    >
      <Form
        onSubmit={(event: SubmitEvent) => setCurrentUser(event.value.username)}
      >
        <FormField name="username" label="Choose a handle" />
        <Button type="submit" primary icon={<LoginIcon />} label="Log In" />
      </Form>
    </Box>
  )
}

export default LogIn
