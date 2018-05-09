import React from "react"
import Card, { CardActions, CardContent, CardHeader } from 'material-ui/Card';
import Paper from 'material-ui/Paper'
import { Typography, Grid, GridListTile } from "material-ui";
import {Link} from 'react-router-dom'
import './BatchCard.css'

const BatchCard = ({ ...props }) => {
  console.log(props)
  return (
    <Link className='batch-card' to={`/batch/${props.id}/students`}>
    <GridListTile >
      <Paper elevation={4} style={{ textAlign: 'center', padding: 50, maxWidth: 300, height: 'auto' }}>
        <Typography variant='title'>
          {props.fullName}
        </ Typography >
        <Typography variant='subheading'>{`Batch #${props.number}`}</Typography>
        <Typography variant='subheading'>{`Student Number`}</Typography>
      </Paper>
    </GridListTile>
    </Link>
  )
}

export default BatchCard