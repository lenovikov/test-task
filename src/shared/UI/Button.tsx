import { FC, ReactNode } from 'react'
import { Button as UIButton } from 'react-bootstrap'

interface IButton {
	variant: 'primary'
	children: ReactNode
	type?: 'submit'
	onClick?: () => void
	className?: string
}

export const Button: FC<IButton> = ({ children, ...rest }) => {
	return <UIButton {...rest}>{children}</UIButton>
}
