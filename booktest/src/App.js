import "./App.css";
import { connect, useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { addCount, setStatus } from './store/roomSlice';
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime"
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
  const rooms = useSelector(state => state.rooms.rooms);
  const [flag, setFlag] = useState(false);
  const [arr, setArr] = useState(defaultState);

  const [count, setCount] = useState(0);
  // console.log(arr);
  // console.log('persistStore', persistStore);

  // useEffect(() => {
  //   if (flag) {
  //     let interval = null;
  //     interval = setInterval(() => {
  //       setArr(
  //         arr.map((item) => {
  //           if (item.count > 0) {
  //             item.count = item.count - 1000;
  //           } 
  //           return item;
  //         })
  //       );
  //     }, 1000);

  //     return () => clearInterval(interval);
      
  //   }
  // }, [arr.count, flag]);

  // useEffect(() => {
  //   const p = setFlag(arr.some((elem) => elem.status === "reserved"));
  //   if (!p) setFlag(false);
  // }, [arr.status]);

  useEffect(() => {
    if(count!==10){
      console.log('persistStore', rooms)
      let interval = null;
      interval = setInterval(() => {
        
          rooms.map((item) => {
            if (item.status === 'reserved') {
              let current = dayjs()
              // // current = dayjs(current.$d).format("hh mm ss");
              // console.log('item.end', item.end)
              // let currentTime = dayjs(item.end).subtract(dayjs(current))
              // console.log('currentTime', currentTime)
              // setCount(count+1)
              // dayjs.extend(relativeTime)

              // let time = dayjs(item.end).fromNow() // 20 years ago
              // let duration = dayjs.duration(item.end.diff(current)).milliseconds()

              // let time = item.end - item.start
              let time = dayjs(item.end).subtract(dayjs(current))
              time = dayjs(time.$d).format("hh mm ss");
              console.log('time', time)
              setCount(count+1)
            } 
            return item;
          })
      
      }, 1000);

      return () => clearInterval(interval);
      // let currentTime = dayjs(end).subtract(dayjs(start))

    }
  }, [count])

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

    // console.log('newArr', arr)
  };

  const handleBook = (room) => {

    // setArr(
      rooms.map((item) => {
        if (item.id === room.id) {
          const id = item.id
          dispatch(setStatus({id}))
          // item.status = "reserved";
          // setFlag(true);
        }
        return item;
      })
    // );
    let start = dayjs()
    let end = dayjs().add(2, 'minute')
    // start = dayjs(start.$d).format("hh mm ss");
    // end = dayjs(end.$d).format("hh mm ss");

    // let currentTime = dayjs(end).subtract(dayjs(start))
    const bookRoom = {
      id: room.id,
      start: start,
      end: end
    }
    // console.log('start', start)
    // console.log('end', end)
    // console.log('currentTime', currentTime)
    dispatch(addCount({bookRoom}))
    setCount(1)
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
