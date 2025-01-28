import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { api } from '../api/request'
import { RootState } from './store'
import { openModal } from './modal.slice'

export interface IPersonalInfoForm {
	firstName: string
	lastName: string
	sex: string
	phoneNumber: string
}
export interface IAddressWorkForm {
	address: string
	workPlace: string
}

export interface ILoanForm {
	loanSum: string
	loanTerm: string
}

interface IForm {
	personalInfo: IPersonalInfoForm
	addressWorkInfo: IAddressWorkForm
	loanInfo: ILoanForm
}

interface IInfoList {
	workPlaces: {
		data: string[]
		error: null | string
		loading: boolean
	}
}

interface IFormData {
	formData: {
		data: string
		error: null | string
		loading: boolean
	}
}

interface IState extends IForm, IInfoList, IFormData {}

const initialState: IState = {
	personalInfo: {
		firstName: '',
		lastName: '',
		sex: '',
		phoneNumber: ''
	},
	addressWorkInfo: {
		address: '',
		workPlace: ''
	},
	loanInfo: {
		loanSum: '200',
		loanTerm: '10'
	},
	workPlaces: {
		data: [],
		error: null,
		loading: false
	},
	formData: {
		data: '',
		error: null,
		loading: false
	}
}

export const getAllWorks = createAsyncThunk<
	string[],
	void,
	{
		rejectValue: { message: string }
	}
>('form/getWorks', async (_, { rejectWithValue }) => {
	try {
		const response = await api<string[]>('products/category-list', 'GET')
		return response
	} catch (e) {
		return rejectWithValue(e as { message: string })
	}
})

export const sendData = createAsyncThunk<
	{ id: number; title: string },
	{ form: string; data: ILoanForm },
	{
		state: RootState
		rejectValue: { message: string }
	}
>('form/add', async (value, { dispatch, getState, rejectWithValue }) => {
	try {
		const state = getState()

		const requestData = {
			title: `Поздравляем, ${state.form.personalInfo.firstName} ${state.form.personalInfo.lastName}. Вам одобрена ${value.data.loanSum}$ на ${value.data.loanTerm} дней`
		}

		const response = await api<{ id: number; title: string }, { title: string }>('products/add', 'POST', requestData)
		dispatch(openModal(response.title))

		return response
	} catch (e) {
		return rejectWithValue(e as { message: string })
	}
})

export const formSlice = createSlice({
	name: 'form',
	initialState: initialState,
	reducers: {
		addToForm: <K extends keyof IState>(state: IState, { payload }: PayloadAction<{ form: K; data: IState[K] }>) => {
			const { form, data } = payload

			state[form] = data
		}
	},
	extraReducers: builder => {
		builder.addCase(getAllWorks.pending, state => {
			state.workPlaces.loading = true
		})
		builder.addCase(getAllWorks.fulfilled, (state, action) => {
			state.workPlaces.data = action.payload
			state.workPlaces.loading = false
			state.workPlaces.error = null
		})
		builder.addCase(getAllWorks.rejected, (state, action) => {
			state.workPlaces.loading = false
			state.workPlaces.error = action.payload?.message as string
		})

		builder.addCase(sendData.pending, state => {
			state.formData.loading = true
		})
		builder.addCase(sendData.fulfilled, (state, action) => {
			state.formData.data = action.payload.title
			state.formData.loading = false
			state.formData.error = null
		})
		builder.addCase(sendData.rejected, (state, action) => {
			state.formData.loading = false
			state.formData.error = action.payload?.message as string
		})
	}
})

export const { addToForm } = formSlice.actions
export const formSliceReducer = formSlice.reducer
