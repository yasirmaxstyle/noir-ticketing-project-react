import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  data: []
}

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUserAction: function (state, action) {
      const userLogin = action.payload
      state.data.push({
        data: userLogin,
        token: self.crypto.randomUUID()
      })
      return state
    },
    logoutUserAction: function () {
      return initialState
    }
  }
})

export const { loginUserAction } = auth.actions
export const { logoutUserAction } = auth.actions
export default auth.reducer