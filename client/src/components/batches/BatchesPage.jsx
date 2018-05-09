import React, { PureComponent } from 'react'
import BatchCard from './BatchCard'
import { Grid, GridList, GridListTile, Paper, Button, FormGroup, GridListTileBar, Tooltip } from 'material-ui';
import { connect } from 'react-redux';
import {fetchBatches, createBatch, fetchStudents} from '../../actions/batches'
import AddIcon from '@material-ui/icons/Add';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import {Link} from 'react-router-dom'
import store from '../../store'


class BatchesPage extends PureComponent {
  state = {
    open: false,
  }

  componentWillMount(){
    //fetch batches
    if(this.props.authenticated){
      if (this.props.batches === null) this.props.fetchBatches()
      if(this.props.students === null) this.props.fetchStudents()
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
    // //create batch
    // console.log(this.state)
      this.props.createBatch(this.state)
  }
  render() {
    const {batches} = this.props
    console.log(this.state)
    if(batches === null) return null
    return (
      <div>
      <Grid style={{ flexGrow: 1, display: 'inline'}} direction={`row`} justify={`center`} alignItems={`center`} container spacing={12}>
        <GridList cellheight={120} cols={3} style={{ margin: '0 0 0 50px'}}>
            {batches.map((b) => BatchCard(b))}
            <Grid item>
          <Button variant='fab' color='secondary' 
          style={{position: "absolute", bottom: 20, right: 20}}
          onClick={this.handleClickOpen}>
            <AddIcon />
          </Button>
          </Grid>
          </ GridList> 
      </Grid>
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
          <form onSubmit={this.handleSubmit}>
        <DialogTitle id="form-dialog-title">Create Batch</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {/* Please Fill In the Batch Number, nickname, start date and end date */}
          </DialogContentText>
          <TextField
            margin="normal"
            name="fullName"
            label="Nickname"
            helperText='Because numbers are boring and hard to remember'
            required
            fullWidth
            onChange={this.handleChange}
            />
          <TextField
            margin="normal"
            name="number"
            label="Batch Number"
            required
            fullWidth
            onChange={this.handleChange}
            />
          <TextField
            margin="normal"
            name="startDate"
            required
            label="Start Date"
            fullWidth
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={this.handleChange}
            />
          <TextField
            margin="normal"
            name="endDate"
            required
            label="End Date"
            type="end date"
            fullWidth
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={this.handleChange}
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            <ClearIcon/>
          </Button>
          <Button type='submit' onClick={this.handleClose} color="primary">
            <DoneIcon/>
          </Button>
        </DialogActions>
        </form>
      </Dialog>
    </div>
    )

  }
}

const mapStateToProps = (state) => ({
  authenticated: state.currentUser!==null,
  batches: state.batches === null ? null : state.batches.sort(((a,b)=> a.id - b.id)),
  students: state.students
})

export default connect(mapStateToProps, {fetchBatches, createBatch, fetchStudents})(BatchesPage)