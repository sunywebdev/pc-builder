const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  components: [],
  user: null,
};

const pcBuildSlice = createSlice({
  name: "pc_build",
  initialState,
  reducers: {
    addToBuilder: (state, action) => {
      state.components.push(action.payload);
    },

    removeToBUild: (state, action) => {
      state.components = state.components.filter(
        (product) => product.id !== action.payload
      );
    },

    removeALlBuildComponents: (state) => {
      state.components = [];
    },
  },
});

export const { addToBuilder, removeToBUild, removeALlBuildComponents } =
  pcBuildSlice.actions;
export default pcBuildSlice.reducer;
