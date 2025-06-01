import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import reducer from "./reducers";

export const store = configureStore({
  reducer,
  middleware: (defaultMiddleware) => {
    return defaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"]
      }
    })
  }
})

export const persistor = persistStore(store)