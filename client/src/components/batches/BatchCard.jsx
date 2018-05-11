import React from "react"
import { Typography, GridListTile } from "material-ui";
import {Link} from 'react-router-dom'
import './BatchCard.css'


const BatchCard = ({ ...props }) => {
  return (
    <Link className='batch-card' to={`/batches/${props.id}`}>
    <GridListTile>
        <Typography gutterBottom variant='display1'>{props.nickname}</ Typography >
        <Typography variant='title'>{`Batch #${props.number}`}</Typography>
        <Typography variant='caption'>{props.startDate} to {props.endDate}</Typography>
        <Typography gutterBottom variant='caption'>{`Click to see number of students`}</Typography>
    </GridListTile>
    </Link>
  )
}

export default BatchCard