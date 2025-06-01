import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  data: []
}

const transaction = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    addOrderAction: function (state, action) {
      const transactionId = nanoid()
      const dupe = state.data.find(e => e.id === action.payload.id)
      const dupeIdx = state.data.findIndex(e => e.id === action.payload.id)
      if (dupe) {
        state.data[dupeIdx] = {
          ...action.payload,
          transactionId
        }
      } else {
        state.data.push({
          ...action.payload,
          transactionId
        })
      }
      return state
    },
    addSeatAction: function (state, action) {
      const transactionId = action.payload.transactionId
      const currentIdx = state.data.findIndex(data => data.transactionId === transactionId)
      state.data[currentIdx].data.seat = action.payload.seat
      return state
    },
    cancelOrderAction: function (state, action) {
      state.data.filter(e => e.transactionId !== action.payload)
      return state
    },
    addPaymentAction: function (state, action) {
      const transactionId = action.payload.transactionId
      const currentIdx = state.data.findIndex(data => data.transactionId === transactionId)
      state.data[currentIdx].data.payment = action.payload.payment
      return state
    },
    finishPaymentAction: function (state, action) {
      const transactionId = action.payload.transactionId
      const currentIdx = state.data.findIndex(data => data.transactionId === transactionId)
      state.data[currentIdx].data.payment.status = action.payload.status
      return state
    }
  }
})

export const { addOrderAction } = transaction.actions
export const { addSeatAction } = transaction.actions
export const { cancelOrderAction } = transaction.actions
export const { addPaymentAction } = transaction.actions
export const { finishPaymentAction } = transaction.actions
export default transaction.reducer