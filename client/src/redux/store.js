import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./slices/UserSlice";
import CategorySlice from "./slices/CategorySlice";
export const store = configureStore({
    reducer: {
        user: UserSlice,
        category: CategorySlice,
    },
});
