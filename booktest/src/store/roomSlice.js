import { createSlice } from "@reduxjs/toolkit";

const roomSlice = createSlice({
  name: "rooms",
  initialState: {
    rooms: [
      { id: 1, start: "", end: "", status: "free" },
      { id: 2, start: "", end: "", status: "free" },
      { id: 3, start: "", end: "", status: "free" },
      { id: 4, start: "", end: "", status: "free" },
      { id: 5, start: "", end: "", status: "free" },
      { id: 6, start: "", end: "", status: "free" },
      { id: 7, start: "", end: "", status: "free" },
      { id: 8, start: "", end: "", status: "free" },
      { id: 9, start: "", end: "", status: "free" },
    ],
  },
  reducers: {
    addCount(state, action) {
      console.log(action.payload.bookRoom.id);
      state.rooms.map((room) => {
        if (room.id === action.payload.bookRoom.id) {
          Object.assign(room, {
            start: action.payload.bookRoom.start,
            end: action.payload.bookRoom.end,
          });
        }
      });
    },
    setStatus(state, action) {
      console.log(action.payload.id);
      state.rooms.map((room) => {
        if (room.id === action.payload.id) {
          Object.assign(room, { status: "reserved" });
        }
      });
    },
    setStatusReserved(state, action) {
      console.log(action.payload.id);
      state.rooms.map((room) => {
        if (room.id === action.payload.id) {
          Object.assign(room, { status: "reserved", start: "", end: "" });
        }
      });
    },
    setStatusFree(state, action) {
      console.log(action.payload.id);
      state.rooms.map((room) => {
        if (room.id === action.payload.id) {
          Object.assign(room, { status: "free", start: "", end: "" });
        }
      });
    },
    setStatusBook(state, action) {
      console.log(action.payload.id);
      state.rooms.map((room) => {
        if (room.id === action.payload.id) {
          Object.assign(room, { status: "book", start: "", end: "" });
        }
      });
    },
  },
});

export const { addCount, setStatus, setStatusFree, setStatusReserved, setStatusBook } = roomSlice.actions;

export default roomSlice.reducer;
