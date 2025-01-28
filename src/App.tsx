import { FC } from 'react'

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Modal } from './shared/UI/Modal'

interface IApp {
	children: React.ReactElement
}

export const App: FC<IApp> = ({ children }) => {
	return (
		<div className='mx-auto'>
			<div>
				<Modal />
			</div>
			<div>{children}</div>
		</div>
	)
}
