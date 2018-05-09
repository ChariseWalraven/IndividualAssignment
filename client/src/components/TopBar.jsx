import React from 'react'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { userId } from '../jwt'
import { connect } from 'react-redux'


const TopBar = (props) => {
  const { location, history, user } = props

  return (
    <AppBar position="absolute" elevation={4}>
      <Toolbar>
        <Typography variant="title" color="inherit" style={{ flex: 1 }}>
          Evaluation Tool
        </Typography>
        {
          user &&
          <Button color="inherit">{user.firstName}</Button>
        }

        {
          location.pathname.indexOf('signup') > 0 &&
          <Button color="inherit" onClick={() => history.push('/login')}>Login</Button>
        }
        {
          location.pathname.indexOf('logout') > 0 &&
          <Link to="/"><Button color="inherit">Login</Button></Link>
        }
        {
          location.pathname.indexOf('login') > 0 &&
          <Button color="inherit" onClick={() => history.push('/signup')}>Sign up</Button>
        }
        {
          location.pathname.indexOf('batches/') > 0 &&
          <Button color="inherit" onClick={() => history.push('/batches')}>All Batches</Button>
        }
        {
          location.pathname.indexOf('students/') > 0 &&
          <Button color="inherit" onClick={() => history.push('/students')}>All Students</Button>
        }
        {
          /batches$/.test(location.pathname) &&
          <Button color="inherit" onClick={() => history.push('/logout')}>Log out</Button>
        }
        {
          /students$/.test(location.pathname) &&
          <Button color="inherit" onClick={() => history.push('/batches')}>All Batches</Button>
        }
      </Toolbar>
    </AppBar>
  )
}

const mapStateToProps = state => ({
  user: state.currentUser && state.users &&
    state.users[userId(state.currentUser.jwt)]
})

export default withRouter(
  connect(mapStateToProps)(TopBar)
)