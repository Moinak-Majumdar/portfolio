import { configureStore } from "@reduxjs/toolkit"
import colorThemeSlice from "./slices/colorThemeSlice";
import darkModeSlice from "./slices/darkModeSlice";

export const store = configureStore({
    reducer: {
        colorTheme: colorThemeSlice.reducer,
        darkMode: darkModeSlice.reducer
    }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;