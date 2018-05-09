import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { fetchStudent } from '../../actions/batches'
import EvaluationForm from './EvaluationForm'
import { Redirect } from 'react-router-dom'
import { Grid, Typography, Paper, Card, Divider } from 'material-ui'
import green from 'material-ui/colors/green'
import yellow from 'material-ui/colors/yellow'
import red from 'material-ui/colors/red'

const g = green[500]
const y = yellow[500]
const r = red[400]

class EvaluationPage extends PureComponent {
  state = {}
  handleSubmit = (data) => {
    // this.props.postSignup(data.email, data.password)
  }
  
  render() {
    const id = Number(window.location.pathname.slice(10)) - 1
    console.log(this.props)
    const student = this.props.students[id]
    return (
      <Grid container direction={`row`} justify={"center"} style={{ width: "70%", margin: "0 auto" }} alignItems={`flex-start`}>
        <Grid item xs={12}>
          <Typography variant='display1'>{student.fullName}</Typography>
        </Grid >
        <Grid item xs={6}>
          <img src='https://cdn.vectorstock.com/i/thumb-large/98/21/woman-girl-female-hair-person-face-head-icon-vector-10189821.jpg'/>
          <Typography variant='headline'>Batch #{2}</Typography>

        </Grid>
        <Grid item xs={6}>
        {/* map over all of a student's evaluations and display the colors */}
          <Typography variant='headline'>Evaluations</Typography>
          <Divider/>
          <div style={{width: 8, height: 8, 'background-color': g}} />
        </Grid>

        <Grid item xs={12}>
        <Typography variant='subheading'>Today's Evaluation</Typography>
          <EvaluationForm onSubmit={this.handleSubmit} />

          {/* <p style={{ color: 'red' }}>{this.props.signup.error}</p> */}
      </Grid>
      </Grid>
    )
  }
}

const mapStateToProps = function (state) {
  return {
    authenticated: state.currentUser !== null,
    students: state.students
  }
}

export default connect(mapStateToProps, { fetchStudent })(EvaluationPage)
