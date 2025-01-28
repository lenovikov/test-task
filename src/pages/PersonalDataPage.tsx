import { TextField } from '../shared/UI/TextField'
import { SelectField } from '../shared/UI/SelectField'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { addToForm, IPersonalInfoForm } from '../store/form.slice'

import { Button } from '../shared/UI/Button'
import { useNavigate } from 'react-router'
import { useAppDispatch, useAppSelector } from '../shared/hooks/store'
import { Card } from 'react-bootstrap'

export const PersonalDataPage = () => {
	const form = useAppSelector(state => state.form)

	const methods = useForm({
		defaultValues: form.personalInfo
	})

	const navigate = useNavigate()
	const dispatch = useAppDispatch()

	const onSubmit: SubmitHandler<IPersonalInfoForm> = data => {
		dispatch(addToForm({ form: 'personalInfo', data }))
		navigate('/address')
	}

	return (
		<div>
			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit(onSubmit)}>
					<Card className='p-4'>
						<Card.Body>
							<TextField name={'firstName'} label='Имя' required />
							<TextField name={'lastName'} label='Фамилия' required />
							<TextField name={'phoneNumber'} label='Номер телефона' required type='phone' />
							<SelectField
								label='Пол'
								name='sex'
								options={[
									{ label: 'Мужской', value: 'male' },
									{ label: 'Женский', value: 'female' }
								]}
								required
							/>
						</Card.Body>
					</Card>

					<div className='d-flex'>
						<Button variant='primary' type='submit'>
							Вперед
						</Button>
					</div>
				</form>
			</FormProvider>
		</div>
	)
}
