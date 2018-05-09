import React, { PureComponent } from 'react'
import { Paper, TextField, Button, FormControl } from 'material-ui';
// get student by id,
// render form for particular student
import green from 'material-ui/colors/green'
import yellow from 'material-ui/colors/yellow'
import red from 'material-ui/colors/red'

const g = green[500]
const y = yellow[500]
const r = red[400]


export default class EvaluationForm extends PureComponent {
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
          <Button value='green' variant='fab' mini style={{'background-color': g, margin: 5}}/>
          <Button value='yellow' variant='fab' mini style={{'background-color': y, margin: 5}}/>
          <Button value='red' variant='fab' mini style={{'background-color': r, margin: 5}}/>
        </div>
        <div>
          <TextField 
            type="date"
            name="date"
            id="date"
            value={
              this.state.date || ''
            } onChange={this.handleChange} />
        </div>
        <div>
          <TextField fullWidth
            label="Remarks"
            type="email"
            name="email"
            id="email"
            value={
              this.state.email || ''
            } onChange={this.handleChange} />
        </div>

        {
          this.state.password &&
          this.state.confirmPassword &&
          this.state.password !== this.state.confirmPassword &&
          <p style={{ color: 'red' }}>The passwords do not match!</p>
        }

        <Button style={{left: '65%'}} color="primary">Save</Button>
        <Button style={{left: '65%'}} color="secondary">Save And Next</Button>
      </form>
    )
  }
}
