import './App.css';
// import { Button } from '@mui/material';
import { connect, useDispatch, useSelector } from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { Button, CardActionArea, CardActions, ListItem } from '@mui/material';
import { useEffect, useState } from 'react';
import { UPDATE_COUNTER } from './types';

const useStyles = makeStyles({

  root: {
    textAlign: "center",
  },
  }) 

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const store = useSelector((state) => state.rooms);
  const [flag, setFlag] = useState(false)
  const [count, setCount] = useState(120)

  const [index, setIndex] = useState(120)

  const [id, setId] = useState(0)



  useEffect(() => {
    // if(flag){
      while(index > 0){
        // console.log('ickdmvdmvd', id)

      setTimeout(() => {
        dispatch({type: UPDATE_COUNTER, payload: id})
        setIndex(index-1)  

      }, 1000)
    }
      // setTimeout(() => {
        // setCount(count-1)
      // }, 1000)
    // }
  }, [index])


  const handleBook = (id1) => {
    setId(id)
    // console.log("time",store)
// let index = 120
setIndex(index-1)  

        dispatch({type: UPDATE_COUNTER, payload: id1})


    
    // dispatch({type: UPDATE_COUNTER, payload: id})
    if(flag)setFlag(false)
    else setFlag(true)
  }

  return (
    <div className='div-button'>
      {store.map((room) => (
        <div className='one' key={room.id}>


    <Card sx={{ maxWidth: 200 }} className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Room #{room.id}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {room.time}
            {/* {count} */}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Button 
        color='success' 
        size="large" 
        variant="contained"
        onClick={() => handleBook(room.id)}
      >
        Book
      </Button>

      </CardActions>
    </Card>
      </div>

      ))}


    </div>
  );
}

function mapStateToProps(state) {
  return { store: state };
}

export default connect(mapStateToProps)(App);
