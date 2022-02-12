import { createSlice } from "@reduxjs/toolkit";

const roomSlice = createSlice({
  name: "rooms",
  initialState: {
    rooms: [
      { id: 1, start: '', end: '', status: "free" },
      { id: 2, start: '', end: '', status: "free" },
      { id: 3, start: '', end: '', status: "free" },
      { id: 4, start: '', end: '', status: "free" },
      { id: 5, start: '', end: '', status: "free" },
      { id: 6, start: '', end: '', status: "free" },
      { id: 7, start: '', end: '', status: "free" },
      { id: 8, start: '', end: '', status: "free" },
      { id: 9, start: '', end: '', status: "free" },
    ],
  },
  reducers: {
    addCount(state, action) {
      console.log(action.payload.bookRoom.id);
      state.rooms.map((room) => {
        if (room.id === action.payload.bookRoom.id) {
          Object.assign(room, { start: action.payload.bookRoom.start, end: action.payload.bookRoom.end });
        }
      });
    },
    setStatus(state, action) {
        console.log(action.payload.id);
        state.rooms.map((room) => {
          if (room.id === action.payload.id) {
            Object.assign(room, { status: 'reserved' });
          }
        });
      },
    toggleComplete(state, action) {
      const toggledTodo = state.todos.find(
        (todo) => todo.id === action.payload.id
      );
      toggledTodo.completed = !toggledTodo.completed;
    },
    removeTodo(state, action) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
    },
  },
});

export const { addCount, setStatus, toggleComplete, removeTodo } = roomSlice.actions;

export default roomSlice.reducer;
