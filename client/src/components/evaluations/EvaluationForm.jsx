import React, { PureComponent } from 'react'
import { TextField, Button, Typography } from 'material-ui';
import green from 'material-ui/colors/green'
import yellow from 'material-ui/colors/yellow'
import red from 'material-ui/colors/red'

export default class EvaluationForm extends PureComponent {

  getDate =() => {
    const date = new Date()
    return date.toJSON().slice(0,10)
  }
  
  state = {
    date: this.getDate()
  }
  
  handleSubmit = (e) => {
    e.preventDefault()
    // submit form
    this.props.onSubmit(this.state)
  }


  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  render() {
    console.log(this.getDate())
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          {/* on click, set color to value */}
          <Typography variant='caption'>
            Chosen Color: <span style={{color: this.state.color}}>{this.state.color}</span>
          </Typography>
            <div>
            <Button value='green' name='color'
            variant='fab' mini onClick={this.handleChange}
              style={{ backgroundColor: green[500], margin: 5}}/>
            <Button value='yellow' name='color'
            variant='fab' mini onClick={this.handleChange}
              style={{ backgroundColor: yellow[500], margin: 5}}/>
            <Button value='red' name='color'
            variant='fab' mini onClick={this.handleChange}
             style={{ backgroundColor: red[400], margin: 5}}/>
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

        <Button style={{left: '45%'}} type='submit' color="primary">Save</Button>
        <Button style={{ left: '45%' }} type='submit' color="secondary">Save And Next</Button>
      </form>
    )
  }
}
