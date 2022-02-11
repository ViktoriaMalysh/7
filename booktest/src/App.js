import "./App.css";
import { connect, useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { ID } from "./types";

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
  const dispatch = useDispatch();
  const store = useSelector((state) => state.rooms);
  const [flag, setFlag] = useState(false);
  const [arr, setArr] = useState(defaultState);
  console.log(arr);

  useEffect(() => {
    if (flag) {
      let interval = null;
      interval = setInterval(() => {
        setArr(
          arr.map((item) => {
            if (item.count > 0) {
              item.count = item.count - 1000;
            } 
            return item;
          })
        );
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [arr.count, flag]);

  useEffect(() => {
    const p = setFlag(arr.some((elem) => elem.status === "reserved"));
    if (!p) setFlag(false);
  }, [arr.status]);

  const handleBookRoom = () => {
    setArr(
      arr.map(async(item) => {
        if (item.status === "reserved") {
          await new Promise(resolve => setTimeout(resolve, 1000));
          const res = Math.random() < 0.5;
          if (res) {
            item.status = "booked"
            item.count = 0;
            console.log('true')
          }else {
            item.status = "free"
            item.count = 0;
            console.log('false')
          }
        } 
        return item;
      })
    );

    console.log('newArr', arr)
  };

  const handleBook = (room) => {
    dispatch({ type: ID, payload: room.id });
    setArr(
      arr.map((item) => {
        if (item.id === room.id) {
          item.count = 120000;
          item.status = "reserved";
          setFlag(true);
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

      {flag ? (
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
      ) : (
        <></>
      )}
    </div>
  );
}

function mapStateToProps(state) {
  return { store: state };
}

export default connect(mapStateToProps)(App);
