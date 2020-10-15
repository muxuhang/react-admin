import React, { useState } from 'react'
import Router from 'next/router'
import { makeStyles } from '@material-ui/core/styles'

import { Info, Search, Menu, AccountCircle } from '@material-ui/icons';
import { Toolbar, Popover, Button, IconButton, Typography, Box } from '@material-ui/core';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';

const useStyles = makeStyles((theme) => ({
  menus: {
    flexGrow: 1,
    textAlign: 'right'
  }
}))

const Nav = (props) => {
  const classes = useStyles()

  const renderLogs = () => {
    return (
      <PopupState variant="popover" popupId="demo-popup-popover">
        {(popupState) => (<>
          <IconButton
            aria-label="search"
            color="inherit"
            {...bindTrigger(popupState)}>
            <Info />
          </IconButton>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
          >
            <Box padding={2}>
              <Typography>The content of the Popover.</Typography>
              <Typography >查看更多</Typography>
            </Box>
          </Popover>
        </>)}
      </PopupState>)
  }
  return (
    <Toolbar>
      <IconButton
        edge="start"
        color="inherit"
        onClick={props.onTab}
        aria-label="menu">
        <Menu />
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
          <Search />
        </IconButton>
        {renderLogs()}
        <IconButton
          aria-label="user"
          color="inherit"
          onClick={() => Router.push('/profile')}>
          <AccountCircle />
        </IconButton>
      </div>
    </Toolbar>
  )
}

export default Nav
