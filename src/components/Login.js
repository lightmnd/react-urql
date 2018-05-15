import React, { Component } from 'react'
import { AUTH_TOKEN } from '../constants'

import Login from './queries/login'

class LoginPage extends Component {
  state = {
    isLogin: true, // switch between Login and SignUp
    email: '',
    password: '',
    name: '',
  }

  onChangeField = ({ target: { name, value } }) => {
    this.setState({ [name]: value })
  }

  toggleLogin = () => {
    this.setState({
      isLogin: !this.state.isLogin
    })
  }

  confirm = async () => {
    const { login, signup } = this.props
    const { isLogin, name, email, password } = this.state

    this.setState({ isLoading: true })

    try {
      let token
      if (this.state.isLogin) {
        const res = await login({ email, password })
        token = res.login.token
      } else {
        const res = await signup({ name, email, password })
        token = res.signup.token
      }

      localStorage.setItem(AUTH_TOKEN, token)
      this.props.history.push(`/`)
    } catch (error) {
      this.setState({ error, isLoading: false })
    }
  }

  render() {
    const { error } = this.state

    return (
      <div>
        <h4 className="mv3">{this.state.isLogin ? 'Login' : 'Sign Up'}</h4>
        <div className="flex flex-column">
          {!this.state.isLogin && (
            <input
              disabled={this.state.isLoading}
              value={this.state.name}
              name="name"
              onChange={this.onChangeField}
              type="text"
              placeholder="Your name"
            />
          )}

          <input
            disabled={this.state.isLoading}
            value={this.state.email}
            name="email"
            onChange={this.onChangeField}
            type="text"
            placeholder="Your email address"
          />

          <input
            disabled={this.state.isLoading}
            value={this.state.password}
            name="password"
            onChange={this.onChangeField}
            type="password"
            placeholder="Choose a safe password"
          />
        </div>

        <div className="flex mt3">
          <div
            className="pointer mr2 button"
            onClick={!this.state.isLoading ? this.confirm : undefined}
          >
            {this.state.isLogin ? 'login' : 'create account'}
          </div>

          <div
            className="pointer button"
            onClick={this.toggleLogin}
          >
            {this.state.isLogin
              ? 'need to create an account?'
              : 'already have an account?'}
          </div>

          {error && <div>{error.message || error}</div>}
        </div>
      </div>
    )
  }
}

export default props => (
  <Login>
    {({ login, signup }) => <LoginPage login={login} signup={signup} {...props} />}
  </Login>
)
