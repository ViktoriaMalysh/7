import { GET_TIME } from "./types";
import { UPDATE_COUNTER } from "./types";

const initialState = {
  rooms: [
      { id:1, time:120 },
      { id:2, time:120 },
      { id:3, time:120 },
      { id:4, time:120 },
      { id:5, time:120 },
      { id:6, time:120 },
      { id:7, time:120 },
      { id:8, time:120 },
      { id:9, time:120 },
  ],
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
       case UPDATE_COUNTER: {
        const  id  = action.payload
        console.log(id)
         state.rooms.map((room) => {
          if (room.id === id) {
            while(room.time > 0) {return { ...room.time=room.time-1 }}
          }
        });
      }
    //   case GET_TIME: {
    //     const  id  = action.payload
    //     state.rooms.map((room) => {
    //         if (room.id === id) {
    //            return {...state, time:room.time}
    //         }
    //       });
    //   }
    default:
      return state;
  }
};