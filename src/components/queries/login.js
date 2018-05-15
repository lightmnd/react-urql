import React from 'react'
import { Connect, mutation } from 'urql'

const signupMutation = `
  mutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`

const loginMutation = `
  mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`

const Login = ({ children }) => (
  <Connect mutation={{
    login: mutation(loginMutation),
    signup: mutation(signupMutation),
  }}>
    {({ login, signup }) => children({ login, signup })}
  </Connect>
)

export default Login
