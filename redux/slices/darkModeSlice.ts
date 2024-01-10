import {PayloadAction, createSlice} from '@reduxjs/toolkit';

type darkModeType = {mode: boolean, modeLite: string}

const INITIAL_STATE:darkModeType = {mode: false, modeLite: 'System'}

const darkModeSlice = createSlice({
    name: 'darkModeSlice',
    initialState: INITIAL_STATE,
    reducers: {
        setMode: (state, action: PayloadAction<darkModeType>):darkModeType => {
            state = action.payload;
            return state;
        }
    }
});

export default darkModeSlice;