import React from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import { Drawer, AppBar, Toolbar, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import Nav from './nav';
import { Dashboard, Home, InsertPhoto, Note, Settings, Store } from '@material-ui/icons';
import Router from 'next/router'

const drawerWidth = 160;

export default function Layout({ children }) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const menu = [
    { name: '首页', path: '/', icon: <Home /> },
    { name: '仪表盘', path: '/dashboards', icon: <Dashboard /> },
    { name: '商品列表', path: '/products', icon: <Store /> },
    { name: '媒体附件', path: '/attachments', icon: <InsertPhoto /> },
    { name: '简单页面', path: '/flatpages', icon: <Note /> },
    // { name: '设置', path: '/settings', icon: <Settings /> },
  ]
  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        style={{ zIndex: theme.zIndex.drawer + 1 }}
      >
        <Nav onTab={() => setOpen(!open)} />
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <List>
          <Toolbar />
          {menu.map((item, index) => (
            <ListItem button key={index} onClick={() => {
              Router.push(item.path)
            }}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        {children}
      </main>
    </div >
  );
}


const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    content: {
      flexGrow: 1
    },
  }),
);