import React, { PureComponent } from 'react'
import StudentsCard from './StudentsCard.jsx'
import { Grid, GridList, GridListTile, Paper, Button, FormGroup, GridListTileBar, Tooltip } from 'material-ui';
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
import { Link } from 'react-router-dom'



class StudentsPage extends PureComponent {
  state = {
    open: false,
    id: Number(window.location.pathname.slice(9)),
  }

  componentWillMount() {
    //fetch students from a particular batch
    if (this.props.authenticated) {
      if (this.props.students === null) {
        const batchId = Number(window.location.pathname.slice(9))
        this.props.fetchBatchStudents(batchId) 
      }

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
    const batchId = Number(window.location.pathname.slice(9))
    // add student
    this.props.createStudent(this.state)
    console.log(this.state)
  }
  render() {
    const { students } = this.props
    if (students === null) return null
    return (
      <div>
        <Grid style={{ flexGrow: 1, display: 'inline' }} direction='row' justify={`center`} alignItems={`center`} container >
          <GridList cols={3} style={{ margin: '0 0 0 50px', height: 600 }} spacing={16}>
            {students.map((s) => <StudentsCard student={s} />)}
            </ GridList>

            <Grid item>
              <Button variant='fab' color='secondary'
                style={{ position: "absolute", bottom: 20, right: 20 }}
                onClick={this.handleClickOpen}>
                <PersonAddIcon />
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
        {/* another dialog to edit evaluations */}
      </div>
    )

  }
}

const mapStateToProps = (state) => ({
  authenticated: state.currentUser !== null,
  students: state.students == null ? null : state.students.sort(((a, b) => a.id - b.id)),
  student: state.student
})

export default connect(mapStateToProps, { fetchBatchStudents, fetchStudents, createStudent, fetchStudent })(StudentsPage)