import React, { PureComponent } from 'react'
import StudentsCard from './StudentsCard.jsx'
import { Grid, GridList, Button, Avatar, Typography, } from 'material-ui';
import { connect } from 'react-redux';
import { fetchBatchStudents, fetchStudents, createStudent, fetchStudent } from '../../actions/batches'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import LiveHelpIcon from '@material-ui/icons/LiveHelp'
import colorPicker from '../../logic/logic'

class StudentsPage extends PureComponent {
  state = {
    theOne: null,
    open: false,
    id: Number(window.location.pathname.slice(9)),
    question: false
  }

  componentWillMount() {
    //fetch students from a particular batch
    if (this.props.authenticated) {
      if (this.props.students === null) {
        this.props.fetchBatchStudents(Number(window.location.pathname.slice(9)))
      }
    }
  }

  handleQuestion = () => {
    // run color picker
    // match color picker to students in batch from state
    const color = colorPicker()
    console.log(this.props.evaluations, this.props.students[0].id)
    // check evaluations of the students and then pick on with the color
    const res = this.props.evaluations.filter(e => e.color === color)
    if (res[0] === undefined) {
      alert('No one has a red!')
      return null
    }
    console.log(res)
    const theOne = this.props.students.filter(s => s.id === res[0].id)

    if (this.state.question === false) {
      this.setState({
        question: true,
        theOne
      })
    }
    if (this.state.question === true) {
      this.setState({
        question: false,
      })
    }
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false })
  };
  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.createStudent(this.state)
  }

  render() {
    const { students } = this.props
    if (students === null) return null
    if (this.props.students === null || this.props.students === undefined || this.props.students.length === 0) {
      this.props.fetchBatchStudents(Number(window.location.pathname.slice(9)))
    }
    return (
      <div>
        <Grid style={{ flexGrow: 1 }} direction='row' justify={`center`} alignItems={`center`} container >
          <Typography style={{marginBottom: 10}} variant='title'>{this.props.students.length} Students</Typography>
          <Grid container spacing={24} direction='row' justify={`center`} alignItems={`center`} style={{ flexGrow: 1 }}>
            <Grid item xs={3} margin='normal'>
              <Button style={{ backgroundColor: 'green' }}>{this.props.percentages.green}</Button>
            </Grid>
            <Grid item xs={3}>
              <Button style={{ backgroundColor: 'yellow' }}>{this.props.percentages.yellow}</Button>
            </Grid>
            <Grid item xs={3}>
              <Button style={{ backgroundColor: 'red' }}>{this.props.percentages.red}</Button>
            </Grid>
          </Grid>
          <GridList cols={3} style={{ margin: '0 0 0 50px', height: 600 }} spacing={40}>
            {students.map((s, i) => <StudentsCard key={'student-' + i} student={s} />)}
          </ GridList>

          <Grid item>
            <Button variant='fab' color='secondary'
              style={{ position: "absolute", bottom: 20, right: 20 }}
              onClick={this.handleClickOpen}>
              <PersonAddIcon />
            </Button>
          </Grid>
          <Grid item>
            <Button variant='fab' color='primary'
              style={{ position: "absolute", bottom: 20, right: 80 }}
              onClick={this.handleQuestion}>
              <LiveHelpIcon />
            </Button>
          </Grid>
        </Grid>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <form onSubmit={this.handleSubmit}>
            <DialogTitle id="form-dialog-title">Add Student</DialogTitle>
            <DialogContent>
              <DialogContentText>
                {/* Please Fill In the Batch Number, fullname, photo link*/}
              </DialogContentText>
              <TextField
                margin="normal"
                name="fullName"
                label="Full Name"
                required
                error={false}
                fullWidth
                onChange={this.handleChange}
              />
              <TextField
                margin="normal"
                name="photo"
                required
                label="Photo URL"
                type="url"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={this.handleChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                <ClearIcon />
              </Button>
              <Button type='submit' onClick={this.handleClose} color="primary">
                <DoneIcon />
              </Button>
            </DialogActions>
          </form>
        </Dialog>
        {/* another dialog to inform you which student receives the question*/}
        <Dialog
          open={this.state.question}
          onClose={this.handleQuestion}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Random Question"}</DialogTitle>

          {this.state.theOne === undefined || this.state.theOne === null ? null :
            (
              <DialogContent><Avatar src={this.state.theOne[0].photo} style={{ margin: 'auto', width: 200, height: 200 }} />
                <DialogContentText id="alert-dialog-description">
                  You should ask {this.state.theOne[0].fullName} a question
            </DialogContentText>
              </DialogContent>
            )}

          <DialogActions>
            <Button onClick={this.handleQuestion} color="primary" autoFocus>
              Ok
           </Button>
          </DialogActions>
        </Dialog>
      </div>
    )

  }
}

const mapStateToProps = (state) => ({
  authenticated: state.currentUser !== null,
  students: state.students == null ? null : state.students.sort(((a, b) => a.id - b.id)),
  student: state.student,
  percentages: state.percentages,
  evaluations: state.evaluations
})

export default connect(mapStateToProps, { fetchBatchStudents, fetchStudents, createStudent, fetchStudent })(StudentsPage)