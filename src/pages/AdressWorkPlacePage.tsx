import { useEffect } from 'react'

import { TextField } from '../shared/UI/TextField'
import { addToForm, getAllWorks, IAddressWorkForm } from '../store/form.slice'
import { Button } from '../shared/UI/Button'
import { useNavigate } from 'react-router'
import { useAppDispatch, useAppSelector } from '../shared/hooks/store'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { SelectField } from '../shared/UI/SelectField'
import { workPlacesMapper } from '../shared/lib/helpers'
import { Card } from 'react-bootstrap'

export const AddressWorkPlacePage = () => {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const { addressWorkInfo, workPlaces } = useAppSelector(state => state.form)

	const methods = useForm({
		defaultValues: addressWorkInfo
	})

	useEffect(() => {
		dispatch(getAllWorks())
	}, [])

	const onSubmit: SubmitHandler<IAddressWorkForm> = data => {
		dispatch(addToForm({ form: 'addressWorkInfo', data }))
		navigate('/loan')
	}

	const forwardPreviousStep = () => {
		navigate('/')
	}

	return (
		<div>
			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit(onSubmit)}>
					<Card className='p-4'>
						<Card.Body>
							<TextField name={'address'} label='Адрес' required />

							{workPlaces.loading ? (
								<div>loading</div>
							) : (
								<SelectField
									label='Место работы'
									name='workplace'
									options={workPlacesMapper(workPlaces.data)}
									required
								/>
							)}
						</Card.Body>
					</Card>

					<div className='d-flex gap-3'>
						<Button onClick={forwardPreviousStep} variant={'primary'}>
							Назад
						</Button>
						<Button type='submit' variant={'primary'}>
							Вперед
						</Button>
					</div>
				</form>
			</FormProvider>
		</div>
	)
}
