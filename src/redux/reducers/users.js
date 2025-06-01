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
    }
  }
})

export const { addUserAction } = users.actions
export default users.reducer