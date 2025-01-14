import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


interface UserAuthData {
    token: string
    refreshToken: string
    userId: number
    email: string
    role: string
}
  

export interface CounterState {
  value: number
}

// useEffect(() => {
//     if (userAuthData) {
//         localStorage.setItem(LOCAL_STORAGE_USERAUTHDATA_KEY, JSON.stringify(userAuthData));
//     }
//   }, [userAuthData]);

// useEffect(() => {
//     const retrivedUserAuthData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_USERAUTHDATA_KEY) as string);

//     if(retrivedUserAuthData) setUserAuthData(retrivedUserAuthData);

//   }, [])

const initialState: CounterState = {
  value: 110,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer