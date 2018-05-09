import React from "react"
import Card, { CardActions, CardContent, CardHeader } from 'material-ui/Card';
import Paper from 'material-ui/Paper'
import { Typography, Grid, GridListTile, Button, Tooltip } from "material-ui";
import Avatar from 'material-ui/Avatar';
import '../batches/BatchCard.css'
import CreateIcon from '@material-ui/icons/Create'
import red from 'material-ui/colors/red'
import green from 'material-ui/colors/green'
import yellow from 'material-ui/colors/yellow'
import {Link} from 'react-router-dom'

const g = green[300]

const StudentsCard = ({ ...props }) => {
  return (
      <GridListTile style={{height: 600}}>
      <Link to={`/students/${props.id}`} className={'batch-card'}>
        <Paper elevation={4} style={{ textAlign: 'center', height: 325, padding: 20}}>
          <Typography variant='title'>{props.fullName}</ Typography >
          <Avatar src={props.photo} style={{margin: 'auto', width: 200, height: 200}}/>
          <Typography variant='subheading'>{`Last Evaluation:`}
          <Button variant='fab' mini 
          style={{ position: "relative", 'background-color': g, left: 10}}
          ></Button></Typography>
        </Paper>
      </Link>
      </GridListTile>

  )
}

export default StudentsCard