import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { signup } from '../../actions/users'
import SignupForm from './SignupForm'
import { Redirect } from 'react-router-dom'
import {Grid} from 'material-ui'

class SignupPage extends PureComponent {
  handleSubmit = (data) => {
    this.props.postSignup(data.email, data.password)
  }

  render() {
    if (this.props.signup.success) return (
      <Redirect to="/" />
    )

    return (
      <Grid container direction={`row`} justify={"center"} style={{ width: "20%", margin: "0 auto" }} alignItems={`center`}>
        <Grid item xs={12}>
        <h1>Sign up</h1>

        <SignupForm onSubmit={this.handleSubmit} />

        <p style={{ color: 'red' }}>{this.props.signup.error}</p>
      </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = function (state) {
  return {
    signup: state.signup
  }
}

export default connect(mapStateToProps, { postSignup: signup })(SignupPage)
