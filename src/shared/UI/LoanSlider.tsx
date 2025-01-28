import React from 'react'
import { Form, Card } from 'react-bootstrap'
import { Controller, useFormContext } from 'react-hook-form'

interface ILoan {
	minLoanAmount: number
	maxLoanAmount: number
	step: number
	label: string
	name: string
}

export const LoanSlider: React.FC<ILoan> = ({ minLoanAmount, maxLoanAmount, step, label, name }) => {
	// Состояние для хранения выбранной суммы
	const { control } = useFormContext()
	// const loanAmount = watch(name)

	return (
		<Card className='p-4'>
			<Card.Body>
				<h3>{label}</h3>

				<Form.Group controlId='loanAmount'>
					<Controller
						name={name}
						control={control}
						render={({ field }) => (
							<Form.Range
								{...field}
								min={minLoanAmount}
								max={maxLoanAmount}
								step={step}
								onChange={e => {
									field.onChange(e.target.value) // Обновляем значение
								}}
							/>
						)}
					/>
				</Form.Group>
				<Form.Group controlId='loanAmountInput' className='mt-3'>
					<Controller
						name={name}
						control={control}
						render={({ field }) => (
							<Form.Control
								{...field}
								type='number'
								min={minLoanAmount}
								max={maxLoanAmount}
								step={step}
								onChange={e => {
									field.onChange(e.target.value) // Обновляем значение
								}}
							/>
						)}
					/>
				</Form.Group>
			</Card.Body>
		</Card>
	)
}
