import "./App.css";
import { connect, useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import {
  addCount,
  setStatus,
  setStatusFree,
  setStatusBook,
  setStatusReserved,
} from "./store/roomSlice";

const defaultState = [
  { id: 1, count: 0, end: 0, status: "free" },
  { id: 2, count: 0, end: 0, status: "free" },
  { id: 3, count: 0, end: 0, status: "free" },
  { id: 4, count: 0, end: 0, status: "free" },
  { id: 5, count: 0, end: 0, status: "free" },
  { id: 6, count: 0, end: 0, status: "free" },
  { id: 7, count: 0, end: 0, status: "free" },
  { id: 8, count: 0, end: 0, status: "free" },
  { id: 9, count: 0, end: 0, status: "free" },
];

function App() {
  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.rooms.rooms);
  const [reserved, setReserved] = useState(0);
  const [arr, setArr] = useState(defaultState);

  useEffect(() => {
    rooms.map((room) => {
      if (room.status === "reserved") {
        setArr(
          arr.map((item) => {
            if (item.id === room.id) {
              let currentTime = new Date();
              let endTime = room.end;
              endTime = new Date(endTime);
              let time = endTime - currentTime;
              item.count = time;
              setReserved(reserved + 1);
            }
            return item;
          })
        );
      }
    });
  }, []);

  useEffect(() => {
    let interval = null;

    rooms.map((room) => {
      if (room.status === "reserved") {
        interval = setInterval(() => {
          setArr(
            arr.map((item) => {
              if (
                item.id === room.id &&
                item.count > 0 &&
                item.count <= 120000
              ) {
                let currentTime = new Date();
                let endTime = room.end;
                endTime = new Date(endTime);
                let time = endTime - currentTime;
                item.status = "reserved";
                item.count = time;
              } else if (item.count < 0) {
                item.status = "free";
                setReserved(reserved - 1);
                item.count = 0;
                const id = room.id;
                dispatch(setStatusFree({ id }));
              }
              return item;
            })
          );
        }, 1000);
      }
      return () => clearInterval(interval);
    });
  }, [rooms]);

  const handleBookRoom = () => {
    setArr(
      arr.map(async (item) => {
        if (item.status === "reserved") {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          const res = Math.random() < 0.5;
          const id = item.id;
          if (res) {
            dispatch(setStatusBook({ id }));
            item.status = "booked";
            setReserved(reserved - 1);
            item.count = 0;
          } else {
            dispatch(setStatusReserved({ id }));
            item.status = "free";
            setReserved(reserved - 1);
            item.count = 0;
          }
        }
        return item;
      })
    );
  };

  const handleBook = (room) => {
    const id = room.id;
    dispatch(setStatus({ id }));
    let start = new Date();
    let end = new Date();

    const countTime = 60 * 1000 * 2;
    end.setTime(end.getTime() + countTime);

    const bookRoom = {
      id: room.id,
      start: start,
      end: end,
    };
    setReserved(reserved + 1);
    dispatch(addCount({ bookRoom }));
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
    <div className="div-container">
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
      </div>
      {reserved !== 0 ? (
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
