import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface User{
    id: string,
    name: string,
    email: string,
    status: boolean,
}

interface UserState{
    users: User[],
}

const initialState : UserState = {
    users: [],
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        getAllUsers: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload;
        },
        newUser: (state, action: PayloadAction<User>) => {
            state.users.push(action.payload);
        },
        deleteUser: (state, action: PayloadAction<string>) => {
            state.users = state.users.filter( (user) => user.id !== action.payload );
        }
    }
});


export const { getAllUsers, newUser, deleteUser } = userSlice.actions;
export const userReducer = userSlice.reducer;