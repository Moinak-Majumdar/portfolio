import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type colorThemeType = {
    name: string, val: string
}

const INITIAL_STATE: colorThemeType = {name: 'Teal', val: '#2dd4bf'}

function manageLocalStorage(theme: colorThemeType) {
    const storage = localStorage.getItem('theme')
    if (typeof storage === 'string') {
        const temp = JSON.parse(storage)
        const { KitMode } = temp
        localStorage.setItem('theme', JSON.stringify({ name: theme.name, val: theme.val, KitMode }))
        const selection = document.getElementById('selection') as HTMLStyleElement;
        const style = document.createElement('style');
        style.setAttribute('id', 'selection')
        style.textContent = `::selection { background-color: ${theme.val}; color: black;}`
        if (!selection) {
            document.head.appendChild(style)
        } else {
            document.head.replaceChild(style, selection)
        }
    }
}

const colorThemeSlice = createSlice({
    name: 'colorThemeSlice',
    initialState: INITIAL_STATE,
    reducers: {
        predefinedColor: (state, action: PayloadAction<colorThemeType>):colorThemeType => {
            state = action.payload;
            manageLocalStorage(action.payload);
            return state;
        },

        randomColor: (state):colorThemeType => {
            const hex = `#${Math.random().toString(16).slice(2, 8).padEnd(6, "8")}`;
            state = { name: hex, val: hex };
            manageLocalStorage({ name: hex, val: hex })
            return state;
        }
    }
});

export default colorThemeSlice;
