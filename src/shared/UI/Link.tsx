import { FC, ReactNode } from 'react'
import { Link as RouterLink } from 'react-router'
import { Button } from './Button'

interface ILink {
	children: ReactNode
	link: string
}

export const Link: FC<ILink> = ({ children, link }) => {
	return (
		<Button variant='primary'>
			<RouterLink to={link}> {children}</RouterLink>
		</Button>
	)
}
