import React, { useState } from 'react'
import Link from 'next/link'
import Router from 'next/router'

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'

import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import StorefrontIcon from '@material-ui/icons/Storefront';
import { makeStyles } from '@material-ui/core/styles'

import SearchIcon from '@material-ui/icons/Search'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import MenuIcon from '@material-ui/icons/Menu';
import { Info } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  menus: {
    flexGrow: 1,
    textAlign: 'right'
  }
}))

const Nav = (props) => {
  const classes = useStyles()
  return (
    <Toolbar>
      <IconButton
        edge="start"
        color="inherit"
        onClick={props.onTab}
        aria-label="menu">
        <MenuIcon />
      </IconButton>
      <Button color="inherit" onClick={() => Router.push('/')}>Teachone</Button>
      <div className={classes.menus}><IconButton
        aria-label="search"
        color="inherit"
        onClick={() => Router.push('/dashboards')}>
        <Typography>仪表盘</Typography>
      </IconButton>
        <IconButton
          aria-label="search"
          color="inherit"
          onClick={() => Router.push('/search')}>
          <SearchIcon />
        </IconButton>
        <IconButton
          aria-label="search"
          color="inherit"
          onClick={() => Router.push('/logs')}>
          <Info />
        </IconButton>
        <IconButton
          aria-label="user"
          color="inherit"
          onClick={() => Router.push('/profile')}>
          <AccountCircleIcon />
        </IconButton>
      </div>
    </Toolbar>
  )
}

export default Nav
