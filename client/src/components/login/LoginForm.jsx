import React, { PureComponent } from 'react'
import { TextField, Button } from 'material-ui'

export default class LoginForm extends PureComponent {
  state = {}

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.onSubmit(this.state)
  }

  handleChange = (event) => {
    const { name, value } = event.target

    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <TextField fullWidth={true} label="Email" type="email" id="email"
          name="email"
            autoComplete="current-password"
            margin="normal" value={
            this.state.email || ''
          } onChange={this.handleChange} />
        </div>

        <div>
          <TextField fullWidth={true} label="Password" id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          margin="normal" value={
            this.state.password || ''
          } onChange={this.handleChange} />
        </div>

        <Button fullWidth={true} color="secondary" type="submit">Login</Button>
      </form>
    )
  }
}
