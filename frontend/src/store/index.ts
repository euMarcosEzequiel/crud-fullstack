import { userReducer } from "../slices/User/user-slice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        user: userReducer,
        
    }
})

const dispatch = store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
export { store, dispatch };