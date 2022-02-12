import { createSlice } from "@reduxjs/toolkit";

const roomSlice = createSlice({
  name: "rooms",
  initialState: {
    rooms: [
      { id: 1, counter: 0, status: "free" },
      { id: 2, counter: 0, status: "free" },
      { id: 3, counter: 0, status: "free" },
      { id: 4, counter: 0, status: "free" },
      { id: 5, counter: 0, status: "free" },
      { id: 6, counter: 0, status: "free" },
      { id: 7, counter: 0, status: "free" },
      { id: 8, counter: 0, status: "free" },
      { id: 9, counter: 0, status: "free" },
    ],
  },
  reducers: {
    addCount(state, action) {
      console.log(action.payload.id);
      state.rooms.map((room) => {
        if (room.id === action.payload.id) {
          Object.assign(room, { counter: 120000 });
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

export const { addCount, toggleComplete, removeTodo } = roomSlice.actions;

export default roomSlice.reducer;
