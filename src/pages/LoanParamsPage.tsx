import { useAppDispatch, useAppSelector } from '../shared/hooks/store'
import { useNavigate } from 'react-router'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { ILoanForm, sendData } from '../store/form.slice'
import { LoanSlider } from '../shared/UI/LoanSlider'
import { Button } from '../shared/UI/Button'

export const LoanParamsPage = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const { loanInfo } = useAppSelector(state => state.form)

	const methods = useForm({
		defaultValues: loanInfo
	})

	const onSubmit: SubmitHandler<ILoanForm> = data => {
		dispatch(sendData({ form: 'loan', data }))
	}

	const forwardPreviousStep = () => {
		navigate('/address')
	}

	return (
		<div>
			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit(onSubmit)}>
					<LoanSlider minLoanAmount={200} name={'loanSum'} label={'Сумма займа'} maxLoanAmount={1000} step={100} />
					<LoanSlider minLoanAmount={10} name={'loanTerm'} label={'Срок займа'} maxLoanAmount={30} step={1} />

					<div className='d-flex gap-3'>
						<Button onClick={forwardPreviousStep} variant={'primary'}>
							Назад
						</Button>
						<Button type='submit' variant={'primary'}>
							Отправить
						</Button>
					</div>
				</form>
			</FormProvider>
		</div>
	)
}
