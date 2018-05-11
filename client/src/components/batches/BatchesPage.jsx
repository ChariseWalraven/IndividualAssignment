import React, { PureComponent } from 'react'
import BatchCard from './BatchCard'
import { Grid, GridList, Button } from 'material-ui';
import { connect } from 'react-redux';
import {fetchBatches, createBatch, fetchStudents, fetchBatchStudents, fetchBatch, fetchBatchEvaluations} from '../../actions/batches'
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';


class BatchesPage extends PureComponent {
  state = {
    open: false,
    id: Number(window.location.pathname.slice(9))
  }
  
  componentWillMount(){
    //fetch batches
    if(this.props.authenticated){
        // this.props.fetchBatch(this.state.id)
      if (this.props.batch === null) {
        this.props.fetchBatches()
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
    // //create batch
      this.props.createBatch(this.state)
  }
  handleClick = (e, b) => {
    this.props.fetchBatchStudents(b.id)
    this.props.fetchBatchEvaluations(b.id)
  }
  render() {
    const {batches} = this.props
    if(batches === null) return null
    return (
      <div>
      <Grid style={{ flexGrow: 1, display: 'inline'}} direction={`row`} justify={`center`} alignItems={`center`} container spacing={16}>
        <GridList cellheight={120} cols={3} style={{ margin: '0 0 0 50px'}}>
            {batches.map((b) => <Button key={`button-${b.id}`} style={{ width: 275, height: 275}} onClick={(e) => this.handleClick(e, b)}>{BatchCard(b)}</Button>)}
            <Grid item>
          <Button variant='fab' color='secondary' 
          style={{position: "absolute", bottom: 20, right: 20}}
          onClick={this.handleClickOpen}>
            <GroupAddIcon />
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
        <DialogTitle id="form-dialog-title">Add Batch</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {/* Please Fill In the Batch Number, nickname, start date and end date */}
          </DialogContentText>
          <TextField
            margin="normal"
            name="nickname"
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
  batch: state.batch === null ? null : state.batch,
  students: state.students === null ? null : state.students.sort(((a, b) => a.id - b.id)),
})

export default connect(mapStateToProps, {fetchBatches, createBatch, fetchStudents, fetchBatchStudents, fetchBatchEvaluations, fetchBatch})(BatchesPage)