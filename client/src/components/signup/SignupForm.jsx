import React, { PureComponent } from 'react'
import { Paper, TextField, Button } from 'material-ui';

export default class SignupForm extends PureComponent {
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
          <TextField fullWidth={true} 
          label="Email"
          type="email" 
          name="email" 
          id="email" 
          value={
            this.state.email || ''
          } onChange={this.handleChange} />
        </div>

        <div>
          <TextField fullWidth={true} 
          autoComplete='current-password'
          label="Password"
          type="password" 
          name="password" 
          id="password" value={
            this.state.password || ''
          } onChange={this.handleChange} />
        </div>

        <div>
          <TextField fullWidth={true} 
          label="Confirm Password"
          type="password" 
          autoComplete="current-password" 
          margin="normal"
          name="confirmPassword" id="confirmPassword" value={
            this.state.confirmPassword || ''
          } onChange={this.handleChange} />
        </div>

        {
          this.state.password &&
          this.state.confirmPassword &&
          this.state.password !== this.state.confirmPassword &&
          <p style={{ color: 'red' }}>The passwords do not match!</p>
        }

        <Button fullWidth={true} color="secondary" type="submit">Sign up</Button>
      </form>
    )
  }
}
