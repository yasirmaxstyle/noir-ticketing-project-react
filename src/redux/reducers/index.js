import { combineReducers } from "@reduxjs/toolkit";
import createTransform from "redux-persist/es/createTransform";
import storage from 'redux-persist/lib/storage'
import persistReducer from "redux-persist/es/persistReducer";

import users from './users'
import auth from './auth'
import transaction from './transaction'
import historyTransaction from './historyTransactions'

const usersPersist = {
  key: 'users',
  transforms: [
    createTransform((inbound) => {
      return window.btoa(JSON.stringify(inbound))
    }, (outbound) => {
      return JSON.parse(window.atob(outbound))
    })
  ],
  storage
}
const authPersist = {
  key: 'auth',
  transforms: [
    createTransform((inbound) => {
      return window.btoa(JSON.stringify(inbound))
    }, (outbound) => {
      return JSON.parse(window.atob(outbound))
    })
  ],
  storage
}
const transactionPersist = {
  key: 'transaction',
  storage
}
const historyTransactionPersist = {
  key: 'history',
  storage
}

const reducer = combineReducers({
  users: persistReducer(usersPersist, users),
  auth: persistReducer(authPersist, auth),
  transaction: persistReducer(transactionPersist, transaction),
  historyTransaction: persistReducer(historyTransactionPersist, historyTransaction)
})

export default reducer