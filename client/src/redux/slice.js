import { createSlice } from "@reduxjs/toolkit";

export const serviceSlice = createSlice({
    name: "service",
    initialState: {
        opneAddPostModal: false,
        openEditProfileModal: false,
        anchorE1: null,
        anchorE2: null,
        darkMode: false,
    },
    reducers: {
        addPostModal: (state, action) => {
            state.opneAddPostModal = action.payload;
        },
        editProfileModal: (state, action) => {
            state.openEditProfileModal = action.payload;
        },
        toggleMainMenu: (state, action) => {
            state.anchorE1 = action.payload;
        },
        toggleMyMenu: (state, action) => {
            state.anchorE2 = action.payload;
        },
        toggleDarkMode: (state) => {
            state.darkMode = !state.darkMode;
        },
    },
});

export const {
    addPostModal,
    editProfileModal,
    toggleMainMenu,
    toggleMyMenu,
    toggleDarkMode,
} = serviceSlice.actions;

export default serviceSlice.reducer;
