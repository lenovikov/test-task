import { FC, ReactNode } from 'react'
import { FormControl, InputGroup } from 'react-bootstrap'
import { Controller, useFormContext } from 'react-hook-form'
import InputMask from 'react-input-mask'

interface ITextField {
	name: string
	type?: string
	label: string
	placeholder?: string
	required?: boolean
}

export const TextField: FC<ITextField> = ({ name, type = 'text', placeholder, label, required }) => {
	const {
		control,
		formState: { errors }
	} = useFormContext()

	return (
		<div className='mb-3'>
			<div className='d-flex'>
				<label style={{ width: '250px', textAlign: 'left' }} htmlFor={name}>
					{label}
				</label>
				<Controller
					control={control}
					name={name}
					rules={{ ...(required ? { required: 'Обязательное поле' } : {}) }}
					render={({ field }) => {
						return type === 'phone' ? (
							<InputMask {...field} mask='0999 999 999' maskChar=' ' id='phone' placeholder='0XXX XXX XXX' />
						) : (
							<InputGroup size='sm' style={{ maxWidth: '350px' }}>
								<FormControl id={name} {...field} type={type} placeholder={placeholder} />
							</InputGroup>
						)
					}}
				/>
			</div>
			{errors && <p className='text-danger'>{errors[name]?.message as ReactNode}</p>}
		</div>
	)
}
