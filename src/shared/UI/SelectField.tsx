import { FC, ReactNode } from 'react'
import { FormControl, InputGroup } from 'react-bootstrap'
import { Controller, useFormContext } from 'react-hook-form'

interface ISelectField {
	label: string
	name: string
	options: { value: string; label: string }[]
	required?: boolean
}

export const SelectField: FC<ISelectField> = ({ label, name, options, required }) => {
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
					name={name}
					control={control}
					rules={{ ...(required ? { required: 'Обязательное поле' } : {}) }}
					render={({ field }) => (
						<InputGroup style={{ maxWidth: '350px' }}>
							<FormControl as='select' id={name} {...field}>
								{options.map((option, index) => (
									<option key={index} value={option.value}>
										{option.label}
									</option>
								))}
							</FormControl>
						</InputGroup>
					)}
				/>
			</div>
			{errors && <p className='text-danger'>{errors[name]?.message as ReactNode}</p>}
		</div>
	)
}
