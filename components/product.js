import React from 'react'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import server from '../api'

const useStyles = makeStyles({
  media: {
    height: 200
  }
})

const Product = ({data, onClick}) => {
  const classes = useStyles()
  return (
    <Card>
      <CardActionArea onClick={onClick}>
        <CardMedia
          className={classes.media}
          image={`${server}${data.images[0]}`}
          title={data.name}
        />
        <CardContent>
          <Typography gutterBottom variant="subtitle1" component="h4">
            {data.name}
          </Typography>
          <Typography variant="h5" color="secondary" component="p">
            {data.price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default Product
