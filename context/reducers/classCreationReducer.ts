import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'exercises',
  initialState: {
    value:{ 
        steps: []
    },
  },
  reducers: {
    // addLesson: (state, action: PayloadAction<Lesson>) => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   state.value = action
    // },
    removeLesson: (state) => {
      state.value = undefined;
    },
    addStep: (state, action: PayloadAction<Step>) => {
        state.value.steps.push(action)
    },
    addExercise: (state, action: any) => {
        if(action.stepId) {
            state.value.steps.find( step => step.id === action.stepId).exercises.push(action)
        }
    }
    // editExercise: (state, action: PayloadAction<Exercise>) => {
    //     state.value.push(action)
    // },
    // removeExercise: (state, action) => {
    //     state.value.steps.find( step => step.id === action.stepId).exercises.filter((exercise) => exercise.id !== action.id);
    // state.value.steps.find( step => step.id === action.stepId).exercises.splice(state.roundScore.findIndex((exercise) => exercise.id === action.id), 1);
    // }
  },
})

export const {  removeLesson, addExercise, addStep  } = counterSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectClass = (state) => state.createClass.value

export default counterSlice.reducer

// selectors
export const getExercise = (state, stepId, exerciseId )=> {
    return state.steps.filter(step => step.id === stepId).filter(exercise => exercise.id === exerciseId)
}
export const getStep = (state, stepId) => {
    return state.steps.filter(step => step.id === stepId);
}