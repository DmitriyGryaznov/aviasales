import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  checkboxes: {
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
    checkbox4: false,
    checkbox5: false
  }
};

const checkboxSlice = createSlice({
  name: "checkboxes",
  initialState,
  reducers: {
    toggleCheckbox: (state, action) => {
      state.checkboxes[action.payload] = !state.checkboxes[action.payload];
    }
  }
});

export const { toggleCheckbox } = checkboxSlice.actions;
export default checkboxSlice;



// const checkboxSlice = createSlice({
//     name: "checkboxes",
//     initialState,
//     reducers: {
//       toggleCheckbox: (state, action) => {
//         const checkboxId = action.payload;
//         state.checkboxes[checkboxId] = !state.checkboxes[checkboxId];
        
//         if (checkboxId === 'all') {
//           state.checkboxes.all = !state.checkboxes.all;
          
//           if (state.checkboxes.all) {
//             for (const key in state.checkboxes) {
//               if (key !== 'all') {
//                 state.checkboxes[key] = true;
//               }
//             }
//           } else {
//             for (const key in state.checkboxes) {
//               if (key !== 'all') {
//                 state.checkboxes[key] = false;
//               }
//             }
//           }
//         } else {
//           if (state.checkboxes[checkboxId] && Object.keys(state.checkboxes).every(key => key !== 'all' && state.checkboxes[key])) {
//             state.checkboxes.all = true;
//           } else {
//             state.checkboxes.all = false;
//           }
//         }
//       }
//     }
//   });


