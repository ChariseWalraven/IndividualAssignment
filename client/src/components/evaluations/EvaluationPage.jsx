import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { fetchStudent, fetchStudentEvaluations, submitEvaluation } from '../../actions/batches'
import EvaluationForm from './EvaluationForm'
import { Grid, Typography, Avatar } from 'material-ui'

class EvaluationPage extends PureComponent {
  state = {
    fullName: 'Jane Doe',
    batch: 999,
    photo:  'https://cdn.vectorstock.com/i/thumb-large/98/21/woman-girl-female-hair-person-face-head-icon-vector-10189821.jpg'
  }
  handleSubmit = (data) => {
    const id = Number(window.location.pathname.slice(10))
    this.props.submitEvaluation(id, data)
    this.props.fetchStudentEvaluations(id)
  }

  handleCli
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
            <EvaluationForm onSubmit={this.handleSubmit} />
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
