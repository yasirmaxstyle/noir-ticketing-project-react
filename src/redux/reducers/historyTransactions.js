import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: []
}

const historyTransaction = createSlice({
  name: 'historyTransaction',
  initialState,
  reducers: {
    addHistoryAction: function (state, action) {
      // const newHistory = structuredClone(action.payload)
      state.data.push(action.payload)
      return state
    },
    updateHistoryAction: function (state, action) {
      const { status, expired, transactionId } = action.payload
      const found = state.data.findIndex(data => data.transactionId === transactionId)
      state.data[found].data.payment.status = status
      state.data[found].data.payment.expired = expired
      return state
    }
  }
})

export const { addHistoryAction } = historyTransaction.actions
export const { updateHistoryAction } = historyTransaction.actions
export default historyTransaction.reducer