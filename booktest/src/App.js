import "./App.css";
// import { Button } from '@mui/material';
import { connect, useDispatch, useSelector } from "react-redux";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import {
  Button,
  CardActionArea,
  CardActions,
  colors,
  ListItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import { ID, UPDATE_COUNTER } from "./types";
import { styled } from "@mui/material/styles";
import { red } from "@mui/material/colors";

const useStyles = makeStyles({
  root: {
    textAlign: "center",
  },
  book: {
    textAlign: "center",
    background: "red",
  },
});

const defaultState = [
  { id: 1, count: 0, status: "free" },
  { id: 2, count: 0, status: "free" },
  { id: 3, count: 0, status: "free" },
  { id: 4, count: 0, status: "free" },
  { id: 5, count: 0, status: "free" },
  { id: 6, count: 0, status: "free" },
  { id: 7, count: 0, status: "free" },
  { id: 8, count: 0, status: "free" },
  { id: 9, count: 0, status: "free" },
];

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const store = useSelector((state) => state.rooms);
  const [flagCount, setFlagCount] = useState(0);
  const [arr, setArr] = useState(defaultState);
  console.log(arr)

  useEffect(() => {
    // arr.map((item)=>{
      // if(item.status === 'reserved'){
   

      let interval = null;
      interval = setInterval(() => {
        setArr(
          arr.map((item) => {
            if (item.count > 0) {
              item.count = item.count - 1000;
            }else item.status = "free";
            return item;
          })
        );
      }, 1000);
      return () => clearInterval(interval);
    // }
    // })
      
  }, [arr.count]);

  const handleBookRoom = async () => {
    // try {
      
      setArr(
        arr.map(async (item) => {
          if (item.status === "reserved") {
            // await new Promise((resolve) => setTimeout(resolve, 1000));
            const res = Math.random() < 0.5;
            if(res){
              item.status = "booked"
              item.count = 0
            }else {
              item.status = "free"
              console.log("This room was booked");
            }
           
          }
          return item 
        }) 
      )    
    // }catch (err) {
      // console.log(err);
    // }
  };

  const handleBook = (room) => {
    dispatch({ type: ID, payload: room.id });
    setArr(
      arr.map((item) => {
        if (item.id === room.id) {
          item.count = 120000;
          item.status = "reserved";
        }
        return item;
      })
    );
  };

  return (
    <div className="div-button">
      {arr.map((room) => (
        <div className="one" key={room.id}>
          <Button
            color={
              room.status === "reserved"
                ? "warning"
                : room.status === "booked"
                ? "error"
                : "success"
            }
            size="large"
            variant="contained"
            onClick={() => handleBook(room)}
          >
            {room.status === "reserved" ? room.count : room.id}
          </Button>
        </div>
      ))}

      {/* {room.status === 'reserved' ? ( */}
      <div className="div-book">
        <Button
          color="primary"
          size="large"
          variant="contained"
          onClick={() => handleBookRoom()}
        >
          Book
        </Button>
      </div>
      {/* ) : (
        <></>
      )} */}
    </div>
  );
}

function mapStateToProps(state) {
  return { store: state };
}

export default connect(mapStateToProps)(App);
