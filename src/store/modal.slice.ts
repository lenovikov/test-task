import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ModalState {
	isOpen: boolean
	data: string
}

const initialState: ModalState = {
	isOpen: false,
	data: ''
}

export const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		openModal: (state, action: PayloadAction<string>) => {
			console.log(action.payload)

			state.isOpen = true
			state.data = action.payload
		},
		closeModal: state => {
			state.isOpen = false
			state.data = ''
		}
	}
})

export const { openModal, closeModal } = modalSlice.actions

export const modalReducer = modalSlice.reducer
