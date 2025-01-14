import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import transSlice from "./slices/transSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    transaction: transSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
