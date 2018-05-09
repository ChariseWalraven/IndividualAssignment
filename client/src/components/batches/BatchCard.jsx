import React from "react"
import Card, { CardActions, CardContent, CardHeader } from 'material-ui/Card';
import Paper from 'material-ui/Paper'
import { Typography, Grid, GridListTile, Button } from "material-ui";
import {Link} from 'react-router-dom'
import './BatchCard.css'
import { fetchBatchStudents } from "../../actions/batches";


const BatchCard = ({ ...props }) => {
  return (
    <Link className='batch-card' to={`/batches/${props.id}`}>
    <GridListTile>
        <Typography gutterBottom variant='display1'>{props.nickname}</ Typography >
        <Typography variant='title'>{`Batch #${props.number}`}</Typography>
        <Typography gutterBottom variant='subheading'>{`Student Number`}</Typography>
        <Typography variant='caption'>{props.startDate} to {props.endDate}</Typography>
    </GridListTile>
    </Link>
  )
}

export default BatchCard