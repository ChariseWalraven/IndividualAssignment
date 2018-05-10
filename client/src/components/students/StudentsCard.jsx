import React, {PureComponent} from "react"
import Paper from 'material-ui/Paper'
import { Typography, GridListTile, IconButton } from "material-ui";
import Avatar from 'material-ui/Avatar';
import '../batches/BatchCard.css'
import DeleteIcon from '@material-ui/icons/Delete'
import { Link } from 'react-router-dom'

class StudentsCard extends PureComponent {
  render() {
    let color ='rbga(0,0,0,0)'
    const {student} = this.props
    if(student.evaluations){
      if(student.evaluations.length !== 0 || student.evaluations[0]){
         color = student.evaluations[0].color
      }
    }
    return (
      <GridListTile style={{ height: 375 }}>
          <Paper elevation={4} style={{ textAlign: 'center', height: 340, padding: 10 }}>
          <IconButton variant='fab' aria-label="Delete" elevation={0}
        style={{ position: 'relative', right: '35%'}}>
        <DeleteIcon/>
        </IconButton>
        <Link to={`/students/${student.id}`} className={'batch-card'}>
            <Typography variant='title'>{student.fullName}</ Typography >
            <Avatar src={student.photo} style={{ margin: 'auto', width: 200, height: 200 }} />
            <Typography variant='subheading'>{`Last Evaluation:`}
              <div style={{ position: "relative", backgroundColor: color, bottom: 30, left: '85%', width: 30, height: 30, borderRadius: 50 }}
              /></Typography>
        </Link>
          </Paper>
      </GridListTile>

    )
  }
}

export default StudentsCard