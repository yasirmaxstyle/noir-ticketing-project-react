import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: []
}

const historyTransaction = createSlice({
  name: 'historyTransaction',
  initialState,
  reducers: {
    addHistoryAction: function (state, action) {
      const { status, ...obj } = action.payload
      const newHistory = structuredClone(obj)
      newHistory.data.payment.status = status
      state.data.push(newHistory)
      return state
    }
  }
})

export const { addHistoryAction } = historyTransaction.actions
export default historyTransaction.reducer