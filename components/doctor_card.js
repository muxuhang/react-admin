import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  main: {
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2)
  },
  cover: {
    minWidth: 128,
    width: 128,
    height: 128,
  },
  desc: {
    height: theme.spacing(7),
    maxHeight: theme.spacing(7),
    lienHeight: theme.spacing(3),
    overflow: 'hidden'
  }
}))

const DoctorCard = ({data}) => {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.cover}
        image={`${process.env.api}${data.avatar}`}
      />
      <CardContent className={classes.main}>
        <Typography
          gutterBottom
          variant="h6"
          component="h4"
        >{data.name}</Typography>
        {/**<Typography
          gutterBottom
          variant="body1"
          component="h6"
          color="secondary"
        >
          {data.hospital.name}
          </Typography>**/}
        <Typography
          className={classes.desc}
          variant="body2"
          component="p"
        >{data.introduction}</Typography>
      </CardContent>
    </Card>
  )
}

export default DoctorCard
