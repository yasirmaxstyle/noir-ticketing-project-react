import { createSlice, nanoid } from "@reduxjs/toolkit"

const initialState = {
  data: []
}

const users = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUserAction: function (state, action) {
      const newData = action.payload
      newData.id = nanoid()
      state.data.push(newData)
      return state
    },
    editUserAction: function (state, action) {
      const found = state.data.findIndex(user => user.id === action.payload.id)
      state.data[found] = {
        ...state.data[found],
        ...action.payload.newData
      }
      return state
    }
  }
})

export const { addUserAction } = users.actions
export const { editUserAction } = users.actions
export default users.reducer