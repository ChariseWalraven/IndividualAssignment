import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { fetchStudent, fetchStudentEvaluations, submitEvaluation } from '../../actions/batches'
import { Grid, Typography, Avatar, Button, TextField } from 'material-ui'
import green from 'material-ui/colors/green'
import yellow from 'material-ui/colors/yellow'
import red from 'material-ui/colors/red'

class EvaluationPage extends PureComponent {

  getDate = () => {
    const date = new Date()
    return date.toJSON().slice(0, 10)
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  state = {
    fullName: 'Jane Doe',
    batch: 999,
    photo:  'https://cdn.vectorstock.com/i/thumb-large/98/21/woman-girl-female-hair-person-face-head-icon-vector-10189821.jpg',
    date: this.getDate()

  }
  handleSubmit = (e) => {
    e.preventDefault()
    const id = Number(window.location.pathname.slice(10))
    console.log(this.state, e)
    this.props.submitEvaluation(id, this.state)
    // this.props.fetchStudentEvaluations(id)
  }

  componentWillMount(){
    const id = Number(window.location.pathname.slice(10))
    this.props.fetchStudent(id)
    this.props.fetchStudentEvaluations(id)
  }
  
  render() {
    if(this.props.student === null || this.props.student === undefined) {
      return(
        <p>Loading...</p>
      )
    }
    else{
      const {student, batch} = this.props
      if(this.props.student.evaluations !== undefined) {
      }
      return (
        <Grid container direction={`row`} justify={"center"} style={{ width: "70%", margin: "0 auto" }} alignItems={`flex-start`}>
          <Grid item xs={12}>
            <Typography variant='display1'>{student.fullName}</Typography>
          </Grid >
          <Grid item xs={4}>
            <Avatar src={student.photo} style={{ width: 180, height: 180 }} />
            <Typography variant='headline'>Batch #{batch.id}</Typography>
  
          </Grid>
          <Grid item xs={8}>
            <Typography variant='headline'>Today's Evaluation</Typography>
            <form onSubmit={this.handleSubmit}>
              <div>
                {/* on click, set color to value */}
                <Typography variant='caption'>
                  Chosen Color: <span style={{ color: this.state.color }}>{this.state.color}</span>
                </Typography>
                <div>
                  <Button value='green' name='color'
                    variant='fab' mini onClick={this.handleChange}
                    style={{ backgroundColor: green[500], margin: 5 }} />
                  <Button value='yellow' name='color'
                    variant='fab' mini onClick={this.handleChange}
                    style={{ backgroundColor: yellow[500], margin: 5 }} />
                  <Button value='red' name='color'
                    variant='fab' mini onClick={this.handleChange}
                    style={{ backgroundColor: red[400], margin: 5 }} />
                </div>
              </div>
              <div>
                <TextField
                  type="date"
                  name="date"
                  id="date"
                  value={
                    this.state.date
                  } onChange={this.handleChange} />
              </div>
              <div>
                <TextField fullWidth
                  label="Remarks"
                  type="text"
                  name="remarks"
                  id="remarks"
                  value={
                    this.state.remarks || ''
                  } onChange={this.handleChange} />
              </div>

              <Button style={{ left: '45%' }} type='submit' color="primary">Save</Button>
              <Button style={{ left: '45%' }} value='next' color="secondary">Save And Next</Button>
            </form>
          </Grid>
  
          <Grid item xs={12}>
            {/* map over all of a student's evaluations and display the colors */}
            <Typography variant='subheading'>Evaluations</Typography>
            {student.evaluations.map(e => <div key={'eval-color-'+e.id} value={e.id} style={{ margin: 5, width: 20, height: 20, backgroundColor: e.color, borderRadius: '10%' }} />)}
            
        </Grid>
        </Grid>
      )
    }
  }
}

const mapStateToProps = function (state) {
  return {
    authenticated: state.currentUser !== null,
    students: state.students,
    student: state.student,
    batch: state.student === null ? null : state.student.batch
  }
}

export default connect(mapStateToProps, { fetchStudent, fetchStudentEvaluations, submitEvaluation })(EvaluationPage)
