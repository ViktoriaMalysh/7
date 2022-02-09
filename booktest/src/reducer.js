import { GET_TIME, ID } from "./types";
import { UPDATE_COUNTER } from "./types";

const initialState = {
  rooms: [
      { id:1, time:120, book: false },
      { id:2, time:120, book: false },
      { id:3, time:120, book: false },
      { id:4, time:120, book: false },
      { id:5, time:120, book: false },
      { id:6, time:120, book: false },
      { id:7, time:120, book: false },
      { id:8, time:120, book: false },
      { id:9, time:120, book: false },
  ],
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
      //  case UPDATE_COUNTER: {
      //   const  id  = action.payload
      //   console.log(id)
      //    state.rooms.map((room) => {
      //     if (room.id === id) {
      //       while(room.time > 0) {return { ...room.time=room.time-1 }}
      //     }
      //   });
      // }
      case ID: {
        const  id  = action.payload
        state.rooms.map((room) => {
            if (room.id === id) {
              console.log('id', id)
               return {...room.book = true}
            }
          });
      }
    default:
      return state;
  }
};