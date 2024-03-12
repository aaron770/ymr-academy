import { configureStore } from '@reduxjs/toolkit'
import classCreationReducer from './reducers/classCreationReducer'
// import counterReducer from '../features/counter/counterSlice'

export const store = configureStore({
  reducer: {
    counter: classCreationReducer
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;