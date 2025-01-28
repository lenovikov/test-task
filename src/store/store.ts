import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { formSliceReducer } from './form.slice'
import { modalReducer } from './modal.slice'

export const rootReducer = combineReducers({
	form: formSliceReducer,
	modal: modalReducer
})

export const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: false
		})
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
